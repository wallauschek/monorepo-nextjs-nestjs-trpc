import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
export type JWTAuthUser = {
  sub: string;
  name: string;
  cpf: string;
  iat: number;
  exp: number;
  perfis: any[];
  alunos: any[];
};
export type AuthUser = Context['user'];

type CreateContext = TrpcService['createContext'];

export type Context = inferAsyncReturnType<CreateContext>;

export type IAuthRequest = Request & {
  headers: { authorization: string };
};

@Injectable()
export class TrpcService {
  constructor(private jwtService: JwtService) {}
  trpc = initTRPC.context<Context>().create();
  publicProcedure = this.trpc.procedure;
  isAuthed = this.trpc.middleware(({ next, ctx }) => {
    if (!ctx.user?.sub) {
      const now = Math.floor(Date.now() / 1000);

      if (ctx.user?.exp && ctx.user.exp < now) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
    }

    return next({
      ctx: {
        user: ctx.user,
      },
    });
  });

  protectedProcedure = this.trpc.procedure.use(this.isAuthed);
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;

  createContext = async (opts: trpcExpress.CreateExpressContextOptions) => {
    const token = this.extractTokenFromHeader(
      opts.req as unknown as IAuthRequest,
    );

    if (!token) {
      return {};
    }

    return {
      user:
        (await this.jwtService.verifyAsync<JWTAuthUser>(token)) ?? undefined,
    };
  };

  private extractTokenFromHeader(request: IAuthRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
