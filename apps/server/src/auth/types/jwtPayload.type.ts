import { perfisDTO } from '@server/totvs/usuarios/usuarios.service';

export type JwtPayload = {
  sub: string;
  name: string;
  cpf: string;
  perfis: perfisDTO[];
  alunos: any[];
};
