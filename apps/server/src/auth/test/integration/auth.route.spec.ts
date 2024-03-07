// import { Test } from '@nestjs/testing';
// import { AppModule } from '@server/app.module';
// import { AuthService } from '@server/auth/auth.service';
// import { TrpcService } from '@server/trpc/trpc.service';
// import { authRouter } from '@server/auth/auth.router';

describe('authRouter', () => {
  // let trpcService: TrpcService;
  // let authService: AuthService;
  // let router: ReturnType<typeof authRouter>;

  beforeAll(async () => {
    // const moduleRef = await Test.createTestingModule({
    //   providers: [AppModule],
    // }).compile();
    // trpcService = moduleRef.get<TrpcService>(TrpcService);
    // authService = moduleRef.get<AuthService>(AuthService);
    // router = authRouter(trpcService, authService);
  });

  it('signInLocal deve chamar authService.signInLocal com os parâmetros corretos', async () => {
    const input = { username: 'test', password: 'test' };

    console.log('🚀 ~ it ~ input:', input);

    // await router.signInLocal.query(input).then((response: any) => {
    //   expect(response).toHaveBeenCalledWith({
    //     usuario: input.username,
    //     password: input.password,
    //   });
    // });
  });

  // Adicione mais testes para as outras rotas aqui...
});
