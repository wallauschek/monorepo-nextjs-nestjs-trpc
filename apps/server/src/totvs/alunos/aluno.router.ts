import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import { AlunosTotvsService } from './alunosTotvs.service';

export function alunoRouter(
  trpc: TrpcService,
  alunoService: AlunosTotvsService,
) {
  return trpc.router({
    buscarNotasBoletim: trpc.protectedProcedure
      .input(
        z.object({
          coligada: z.number(),
          periodoLetivo: z.string(),
          ra: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        //verificar se usuário existe e validade do token
        if (
          !ctx.user?.alunos.filter(
            (aluno) =>
              aluno.ra === input.ra &&
              aluno.coligada === input.coligada &&
              aluno.periodoLetivo === input.periodoLetivo,
          )
        ) {
          //usuário não autorizado
          throw new Error('Usuário não encontrado');
        }
        return await alunoService.getNotasBoletim(
          input.coligada,
          input.periodoLetivo,
          input.ra,
        );
      }),
  });
}
