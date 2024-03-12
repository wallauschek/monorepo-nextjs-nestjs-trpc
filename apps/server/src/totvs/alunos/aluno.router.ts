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
        const verificaAluno = ctx.user?.alunos.find(
          (aluno) =>
            aluno.registroAcademicoBasico == input.ra &&
            aluno.codColigada == input.coligada &&
            aluno.periodoLetivo == input.periodoLetivo,
        );

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
          verificaAluno.codSerie || '',
          input.ra,
        );
        return {
          status: true,
          notas,
        };
      }),
    buscarFaltasCELBoletim: trpc.protectedProcedure
      .input(
        z.object({
          periodoLetivo: z.string(),
          ra: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const verificaAluno = ctx.user?.alunos.find(
          (aluno) =>
            aluno.registroAcademicoBasico == input.ra &&
            aluno.periodoLetivo == input.periodoLetivo,
        );

        if (verificaAluno?.length === 0) {
          //usuário não autorizado
          return {
            status: false,
            faltas: [],
          };
        }
        const faltas = await alunoService.getFaltasCELBoletim(
          input.periodoLetivo,
          input.ra,
        );
        return {
          status: true,
          faltas,
        };
      }),
    buscarTrilhasCELBoletim: trpc.protectedProcedure
      .input(
        z.object({
          periodoLetivo: z.string(),
          ra: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const verificaAluno = ctx.user?.alunos.find(
          (aluno) =>
            aluno.registroAcademicoBasico == input.ra &&
            aluno.periodoLetivo == input.periodoLetivo,
        );

        if (verificaAluno?.length === 0) {
          //usuário não autorizado
          return {
            status: false,
            trilhas: [],
          };
        }
        const trilhas = await alunoService.getTrilhasCELBoletim(
          input.periodoLetivo,
          input.ra,
        );
        return {
          status: true,
          trilhas,
        };
      }),
  });
}
