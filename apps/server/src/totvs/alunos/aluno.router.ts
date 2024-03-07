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
        const verificaAluno = ctx.user?.alunos.filter(
          (aluno) =>
            aluno.registroAcademicoBasico == input.ra &&
            aluno.codColigada == input.coligada &&
            aluno.periodoLetivo == input.periodoLetivo,
        );

        console.log('🚀 ~ .query ~ verificaAluno:', ctx);

        if (verificaAluno?.length === 0) {
          //usuário não autorizado
          return {
            status: false,
            notas: [],
          };
        }
        const notas = await alunoService.getNotasBoletim(
          input.coligada,
          input.periodoLetivo,
          input.ra,
        );
        return {
          status: true,
          notas,
        };
      }),
  });
}
