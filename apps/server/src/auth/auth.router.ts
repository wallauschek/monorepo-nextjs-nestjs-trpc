import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import { AuthService } from './auth.service';

export function authRouter(trpc: TrpcService, authService: AuthService) {
  return trpc.router({
    signInLocal: trpc.publicProcedure
      .input(
        z.object({
          username: z.string(),
          password: z.string(),
        }),
      )
      .query(({ input }) => {
        const { username, password } = input;
        const auth = authService.signInLocal({ usuario: username, password });
        return auth;
      }),

    refreshToken: trpc.publicProcedure
      .input(
        z.object({
          userId: z.string(),
          refresh_token: z.string(),
        }),
      )
      .query(({ input }) => {
        const { userId, refresh_token } = input;
        const refresh = authService
          .refreshTokens(userId, refresh_token)
          .then((response) => {
            return response;
          });
        return refresh;
      }),

    logout: trpc.protectedProcedure.query(({ ctx }) => {
      if (!ctx.user?.sub) {
        throw new Error('Usuário não encontrado');
      }
      const logout = authService.logout(ctx.user?.sub);
      return logout;
    }),

    recoveryPassword: trpc.publicProcedure
      .input(
        z.object({
          coligada: z.number(),
          usuario: z.string(),
          email: z.string().email(),
        }),
      )
      .query(async ({ input }) => {
        const response = await authService.recuperarSenha(input);
        return response;
      }),

    resetPassword: trpc.publicProcedure
      .input(
        z.object({
          token: z.string(),
          senha: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const response = await authService.salvarNovaSenha(input);
        return response;
      }),

    getUser: trpc.protectedProcedure.input(z.void()).query(({ ctx }) => {
      //verificar se usuário existe e validade do token
      if (!ctx.user?.sub) {
        //usuário não autorizado
        throw new Error('Usuário não encontrado');
      }
      return ctx.user;
    }),
  });
}
