import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AlunosTotvsService } from '../alunos/alunosTotvs.service';

interface RoleMapping {
  perfil: string;
  escola: string;
}

export interface perfisDTO {
  escola: string;
  codColigada?: number;
  perfis: string[] | null;
}

@Injectable()
export class UsuarioTotvsService {
  constructor(private readonly alunosService: AlunosTotvsService) {}
  //Faz o Login e Retorna um Access Token e Refresh Token
  async FazerLoginTotvs(dataJson: any): Promise<any> {
    return await axios({
      method: 'POST',
      url: process.env.URL_API_TOTVS + '/api/connect/token/',
      data: {
        username: dataJson.codigo,
        password: dataJson.password,
      },
    })
      .then(async (e) => {
        return {
          status: true,
          token: e.data.access_token,
          refreshToken: e.data.refresh_token,
        };
      })
      .catch(() => {
        return { status: false };
      });
  }

  async ValidaUsuarioTotvs(codigo: string): Promise<any> {
    const verificaRoles = await axios({
      method: 'GET',
      url:
        process.env.URL_API_TOTVS +
        `/api/framework/v1/users/${codigo}?expand=roles`,
      headers: {
        Authorization: `Basic ${process.env.TOKEN_API_TOTVS}`,
      },
    })
      .then(async (dataRoles) => {
        const mapeiaPerfis: perfisDTO[] = [
          {
            escola: 'CEL',
            perfis: null,
            codColigada: 1,
          },
          {
            escola: 'FRANCO',
            perfis: null,
            codColigada: 5,
          },
        ];

        // Mapeamento de roles para perfis e escolas
        const roleMappings: Record<string, RoleMapping> = {
          RespFinanc_CEL: { perfil: 'responsavel_financeiro', escola: 'CEL' },
          RespFin_CEL_Bolsa: {
            perfil: 'responsavel_financeiro',
            escola: 'CEL',
          },
          RespFin_CEL_FLA: { perfil: 'responsavel_financeiro', escola: 'CEL' },
          RespFinanc_LFB: {
            perfil: 'responsavel_financeiro',
            escola: 'FRANCO',
          },
          RespFin_LFB_Bolsa: {
            perfil: 'responsavel_financeiro',
            escola: 'FRANCO',
          },
          // Adicione novos roles aqui...
          'Aluno CEL_S': { perfil: 'aluno', escola: 'CEL' },
          'Aluno LICEU_S': { perfil: 'aluno', escola: 'FRANCO' },
          RespAcad_CEL: { perfil: 'responsavel_academico', escola: 'CEL' },
          RespAcad_LFB: { perfil: 'responsavel_academico', escola: 'FRANCO' },
        };

        for (const role of dataRoles.data.roles) {
          const mapping: RoleMapping = roleMappings[role.value];

          if (mapping) {
            const perfil = mapeiaPerfis.find(
              (p) => p.escola === mapping.escola,
            );

            if (perfil) {
              if (!perfil.perfis) {
                perfil.perfis = [];
              }
              perfil.perfis.push(mapping.perfil);
            }
          }
        }

        const alunos = await this.alunosService.getAlunosAtivos(codigo);

        //verificar nos alunos se o perfil correspondente é encontrado
        const alunosPerfis: any[] = [];
        if (alunos.alunos.length > 0) {
          alunos.alunos.forEach((aluno: any) => {
            const perfil = mapeiaPerfis.find(
              (p) => p.codColigada === aluno.codColigada,
            );
            if (perfil) {
              if (
                aluno.respFinanceiro &&
                !perfil.perfis?.includes('responsavel_financeiro')
              ) {
                aluno = { ...aluno, respFinanceiro: 0 };
              }
              if (
                aluno.respAcademico &&
                !perfil.perfis?.includes('responsavel_academico')
              ) {
                aluno = { ...aluno, respAcademico: 0 };
              }
              if (
                aluno.filiacao &&
                !perfil.perfis?.includes('responsavel_academico')
              ) {
                aluno = { ...aluno, filiacao: 0 };
              }
              if (aluno.aluno && !perfil.perfis?.includes('aluno')) {
                aluno = { ...aluno, aluno: 0 };
              }
              if (
                aluno.respFinanceiro ||
                aluno.respAcademico ||
                aluno.filiacao ||
                aluno.aluno
              ) {
                alunosPerfis.push(aluno);
              }
            }
          });
        }

        if (mapeiaPerfis.length > 0) {
          return {
            status: true,
            usuario: {
              codigo: dataRoles.data.userName,
              nome: dataRoles.data.name.formatted,
              email: dataRoles.data.emails.find((e: any) => {
                return e.primary;
              }).value,
            },
            perfil: mapeiaPerfis,
            alunos: alunosPerfis,
          };
        }
        return {
          status: false,
          error:
            'Usuário não possui perfil para acessar o Portal do Aluno e Responsável',
        };
      })
      .catch(() => {
        return { status: false, error: 'Usuário não encontrado' };
      });

    return verificaRoles;
  }

  async alterarSenhaTotvs(dataJson: any): Promise<any> {
    const usuario = await this.ValidaUsuarioTotvs(dataJson.codigo);

    if (!usuario.status) {
      return { status: false };
    }

    return await axios({
      method: 'PATCH',
      url:
        process.env.URL_API_TOTVS +
        `/api/framework/v1/users/${dataJson.codigo}`,
      headers: {
        Authorization: `Basic ${process.env.TOKEN_API_TOTVS}`,
      },
      data: {
        id: dataJson.codigo,
        password: dataJson.password,
      },
    })
      .then(async () => {
        return {
          status: true,
        };
      })
      .catch(() => {
        return { status: false };
      });
  }
}
