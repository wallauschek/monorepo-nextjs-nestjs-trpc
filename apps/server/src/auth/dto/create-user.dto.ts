import { ApiProperty } from '@nestjs/swagger';
import { perfisDTO } from '@server/totvs/usuarios/usuarios.service';
import { z } from 'zod';

const CreateAuthDtoSchema = z.object({
  email: z.string().email(),
  usuario: z.string(),
  password: z.string().optional(),
  nome: z.string(),
  codigo_recuperacao: z.string().optional(),
  perfis: z.array(z.any()).optional(),
  alunos: z.array(z.any()).optional(),
});

export class CreateAuthDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    example: '01101101100',
    description: 'usuário de acesso ao sistema',
  })
  usuario: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  password?: string;

  @ApiProperty({
    example: 'Test',
    description: 'Nome do usuário',
  })
  nome: string;

  codigo_recuperacao?: string;

  perfis?: perfisDTO[];

  alunos?: any[];

  constructor(
    email: string,
    nome: string,
    usuario: string,
    password?: string,
    codigo_recuperacao?: string,
    perfis?: string[],
    alunos?: any[],
  ) {
    const result = CreateAuthDtoSchema.parse({
      email,
      nome,
      usuario,
      password,
      codigo_recuperacao,
      perfis,
      alunos,
    });

    // Atribuição das propriedades validadas
    this.email = result.email;
    this.usuario = result.usuario;
    this.password = result.password;
    this.nome = result.nome;
    this.codigo_recuperacao = result.codigo_recuperacao;
    this.perfis = result.perfis;
    this.alunos = result.alunos;
  }
}
