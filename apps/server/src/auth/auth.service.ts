import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import * as argon from 'argon2';

// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-user.dto';
// import { ResponsaveisTotvsService } from '@server/totvs/responsaveis/responsaveis.service';
import {
  UsuarioTotvsService,
  perfisDTO,
} from '@server/totvs/usuarios/usuarios.service';
import { PrismaService } from '@server/prisma/prisma.service';

import { JwtPayload, Tokens } from './types';
import {
  AuthDto,
  RecuperaSenhaDto,
  /* RecuperaSenhaDto, */ SalvarNovaSenhaDto,
} from './dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    // private config: ConfigService,
    private usuarioTotvsService: UsuarioTotvsService,
    // private responsaveisTotvsService: ResponsaveisTotvsService,
  ) {}

  async signupLocal(dto: CreateAuthDto): Promise<Tokens> {
    if (!dto.password) {
      throw Error('Failed to create user');
    }
    const hash = await argon.hash(dto.password);
    const { perfis, alunos } = dto;

    delete dto.password;
    delete dto.perfis;
    delete dto.alunos;

    const user = await this.prisma.usuario
      .create({
        data: {
          id: randomUUID(),
          ...dto,
          hash,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw Error(error);
      });

    if (!perfis) {
      throw Error('Failed to create user');
    }
    const tokens = await this.getTokens(
      user.id,
      user.nome,
      user.usuario,
      perfis,
      alunos,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signInLocal(dto: AuthDto): Promise<Tokens> {
    // console.log('🚀 ~ AuthService ~ signInLocal ~ dto:', dto);

    let user = await this.prisma.usuario.findUnique({
      where: {
        usuario: dto.usuario,
      },
    });

    const login = await this.usuarioTotvsService.FazerLoginTotvs({
      codigo: dto.usuario,
      password: dto.password,
    });

    // console.log('🚀 ~ AuthService ~ signInLocal ~ login:', login);

    if (!login.status) throw new ForbiddenException('Access Denied');

    const dadosUsuario = await this.usuarioTotvsService.ValidaUsuarioTotvs(
      dto.usuario,
    );

    if (!dadosUsuario.status) throw new ForbiddenException('Access Denied');

    // const dadosResponsavelFinanceiro =
    //   await this.responsaveisTotvsService.buscarDadosRespFinanCPF(dto.usuario);

    // if (dadosResponsavelFinanceiro instanceof Error)
    //   throw new ForbiddenException('Access Denied');

    if (!user) {
      if (!dadosUsuario.status) throw new ForbiddenException('Access Denied');

      const createUser = await this.signupLocal({
        nome: dadosUsuario.usuario.nome,
        usuario: dto.usuario,
        password: dto.password,
        email: dadosUsuario.usuario.email,
        perfis: dadosUsuario.tipo,
      });

      if (createUser instanceof Error)
        throw new ForbiddenException('Access Denied');

      user = await this.prisma.usuario.findUnique({
        where: {
          usuario: dto.usuario,
        },
      });
    }

    if (!user) throw new ForbiddenException('Access Denied');

    //atualiza data de último login no usuário
    await this.prisma.usuario.update({
      where: {
        id: user.id,
      },
      data: {
        ultimoLogin: new Date(),
      },
    });

    const tokens = await this.getTokens(
      user.id,
      user.nome,
      user.usuario,
      dadosUsuario.perfil,
      dadosUsuario.alunos,
    );

    // console.log('🚀 ~ AuthService ~ signInLocal ~ tokens:', tokens);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.usuario.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const dadosUsuario = await this.usuarioTotvsService.ValidaUsuarioTotvs(
      user.usuario,
    );

    if (!dadosUsuario.status) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(
      user.id,
      user.nome,
      user.usuario,
      dadosUsuario.perfil,
      dadosUsuario.alunos,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.usuario.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(
    userId: string,
    name: string,
    cpf: string,
    perfis: perfisDTO[],
    alunos: any[] = [],
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      name: name,
      cpf: cpf,
      perfis: perfis,
      alunos: alunos,
    };

    console.log('🚀 ~ AuthService ~ jwtPayload:', jwtPayload);

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '7d',
      }),
    ]);

    console.log('🚀 ~ AuthService ~ at:', at);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async recuperarSenha(dto: RecuperaSenhaDto): Promise<boolean> {
    let link = '';

    //verificar se o usuário existe no totvs
    const usuarioTotvs = await this.usuarioTotvsService.ValidaUsuarioTotvs(
      dto.usuario,
    );

    console.log(
      '🚀 ~ AuthService ~ recuperarSenha ~ usuarioTotvs:',
      usuarioTotvs,
    );

    if (!usuarioTotvs.status) throw new ForbiddenException('Access Denied');

    //verificar se o email do usuário está correto
    if (usuarioTotvs.usuario.email !== dto.email)
      throw new ForbiddenException('Access Denied');

    //verificar se o usuário já existe
    let user = await this.prisma.usuario.findFirst({
      where: {
        usuario: dto.usuario,
        email: dto.email,
      },
    });

    //se não existir, criar
    if (!user) {
      if (usuarioTotvs) {
        const createUser = await this.signupLocal({
          nome: usuarioTotvs.usuario.nome,
          usuario: dto.usuario,
          password: Math.random().toString(36).slice(-8),
          email: usuarioTotvs.usuario.email,
          codigo_recuperacao: randomUUID(),
        });

        if (createUser instanceof Error)
          throw new ForbiddenException('Access Denied');

        user = await this.prisma.usuario.findUnique({
          where: {
            usuario: dto.usuario,
          },
        });

        if (!user) throw new ForbiddenException('Access Denied');

        link = `${
          dto.coligada === 5 ? process.env.FRONT_FRANCO : process.env.FRONT_CEL
        }/redefinir-senha/${user.codigo_recuperacao}`;
      }

      if (user) {
        console.log('🚀 ~ AuthService ~ recuperarSenha ~ link:', link);
        //enviar email com o token
        // this.emailJob.enviarEmailRecuperaSenha({
        //   escola: dto.coligada === 5 ? 'liceu' : 'cel', // Substitua conforme necessário
        //   destinatarioEmail: user.email,
        //   destinatarioNome: user.nome,
        //   link,
        // });
      }
    }
    return true;
  }

  async salvarNovaSenha(dto: SalvarNovaSenhaDto): Promise<boolean> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        codigo_recuperacao: dto.token,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const usuarioTotvs = await this.usuarioTotvsService.ValidaUsuarioTotvs(
      user.usuario,
    );

    if (!usuarioTotvs.status) throw new ForbiddenException('Access Denied');

    const alteraSenha = await this.usuarioTotvsService.alterarSenhaTotvs({
      codigo: user.usuario,
      password: dto.senha,
    });

    if (!alteraSenha.status) throw new ForbiddenException('Access Denied');

    await this.prisma.usuario.update({
      where: {
        id: user.id,
      },
      data: {
        hash: await argon.hash(dto.senha),
        codigo_recuperacao: null,
      },
    });
    return true;
  }
}
