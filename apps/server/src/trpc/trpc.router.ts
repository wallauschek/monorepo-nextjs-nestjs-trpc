import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TrpcService } from '@server/trpc/trpc.service';
import { AuthService } from '@server/auth/auth.service';
import { AlunosTotvsService } from '@server/totvs/alunos/alunosTotvs.service';
import { authRouter } from '@server/auth/auth.router';
import { alunoRouter } from '@server/totvs/alunos/aluno.router';
import { helloRouter } from './hello';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private authService: AuthService,
    private alunosTotvsService: AlunosTotvsService,
  ) {}

  // Combine a rota hello com outras rotas usando mergeRouters
  appRouter = this.trpc.mergeRouters(
    helloRouter(this.trpc),
    authRouter(this.trpc, this.authService),
    alunoRouter(this.trpc, this.alunosTotvsService),
  );

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createContext,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
