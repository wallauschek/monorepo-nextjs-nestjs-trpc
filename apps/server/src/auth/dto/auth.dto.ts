import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

const AuthDtoSchema = z.object({
  usuario: z.string(),
  password: z.string(),
});

export class AuthDto {
  @ApiProperty({
    example: '01101101111',
    description: 'Email do usuário',
  })
  usuario: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  password: string;

  constructor(usuario: string, password: string) {
    const result = AuthDtoSchema.parse({ usuario, password });
    this.usuario = result.usuario;
    this.password = result.password;
  }
}

const RecuperaSenhaDtoSchema = z.object({
  coligada: z.number(),
  usuario: z.string(),
  email: z.string().email(),
});

export class RecuperaSenhaDto {
  @ApiProperty({
    example: 5,
    description: 'Coligada do usuário',
  })
  coligada: number;

  @ApiProperty({
    example: '01101101111',
    description: 'CPF do usuário',
  })
  usuario: string;

  @ApiProperty({
    example: 'email@usuario.com',
    description: 'Email do usuário',
  })
  email: string;

  constructor(coligada: number, usuario: string, email: string) {
    const result = RecuperaSenhaDtoSchema.parse({ coligada, usuario, email });
    this.coligada = result.coligada;
    this.usuario = result.usuario;
    this.email = result.email;
  }
}

const SalvarNovaSenhaDtoSchema = z.object({
  token: z.string(),
  senha: z.string(),
});

export class SalvarNovaSenhaDto {
  @ApiProperty({
    example: 'hash',
    description: 'token de recuperação de senha',
  })
  token: string;

  @ApiProperty({
    example: 'Abc123456',
    description: 'Senha do usuário',
  })
  senha: string;

  constructor(token: string, senha: string) {
    const result = SalvarNovaSenhaDtoSchema.parse({ token, senha });
    this.token = result.token;
    this.senha = result.senha;
  }
}
