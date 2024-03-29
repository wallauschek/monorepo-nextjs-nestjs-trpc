// Generated by CodiumAI
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@server/app.module';
import { UsuarioTotvsService } from './usuarios.service';

describe('UsuarioTotvsService', () => {
  let usuarioTotvsService: UsuarioTotvsService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    usuarioTotvsService = moduleRef.get(UsuarioTotvsService);
    usuarioTotvsService = new UsuarioTotvsService();
  });

  afterAll(async () => {
    if (moduleRef) {
      await moduleRef.close();
    }
  });

  describe('FazerLoginTotvs', () => {
    // Returns a valid access token and refresh token when given valid credentials
    it('deve devolver um token de acesso válido e um token de atualização quando recebidos credenciais válidas', async () => {
      // Call the FazerLoginTotvs method with valid credentials
      const result = await usuarioTotvsService.FazerLoginTotvs({
        codigo: '08417154752',
        password: '123456',
      });

      // Assert that the result is as expected
      expect(result).toEqual({
        status: true,
        token: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('Deve retornar false quando recebidos credenciais inválidas', async () => {
      // Call the FazerLoginTotvs method with valid credentials
      const result = await usuarioTotvsService.FazerLoginTotvs({
        codigo: '08417154752',
        password: 'invalid_password',
      });

      // Assert that the result is false
      expect(result).toEqual({ status: false });
    });
  });

  describe('ValidaUsuarioTotvs', () => {
    it('deve retornar uma resposta válida quando recebe um código de usuário válido', async () => {
      const codigo = '08417154752';
      const expectedResponse = {
        status: true,
        usuario: {
          codigo: '08417154752',
          nome: 'PEDRO FONSECA WALLAUSCHEK',
          email: 'pedro.wallauschek@cel.g12.br',
        },
        tipo: [
          {
            escola: 'CEL',
            perfis: ['responsavel_academico', 'responsavel_financeiro'],
          },
          {
            escola: 'FRANCO',
            perfis: ['responsavel_financeiro'],
          },
        ],
      };

      // Act
      const response = await usuarioTotvsService.ValidaUsuarioTotvs(codigo);

      // Assert
      expect(response).toEqual(expectedResponse);
    });

    it('deve retornar false quando recebe um código de usuário inválido', async () => {
      // Arrange
      const codigo = 'invalidUserCode';
      const expectedResponse = {
        status: false,
        error: 'Usuário não encontrado',
      };

      // Act
      const response = await usuarioTotvsService.ValidaUsuarioTotvs(codigo);

      // Assert
      expect(response).toEqual(expectedResponse);
    });

    // it('deve retornar false quando recebido um código de usuário sem funções de Responsável Financeiro', async () => {
    //   // Arrange
    //   const codigo = '2019500128';
    //   const expectedResponse = {
    //     status: false,
    //     error: 'Usuário não possui perfil de responsável financeiro',
    //   };

    //   // Act
    //   const response = await usuarioTotvsService.ValidaUsuarioTotvs(codigo);

    //   // Assert
    //   expect(response).toEqual(expectedResponse);
    // });

    // it('deve retornar falso quando a chamada da API falhar', async () => {
    //   // Arrange
    //   const codigo = 'validUserCode';
    //   const expectedResponse = {
    //     status: false,
    //     error: 'Usuário não encontrado',
    //   };

    //   jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
    //     of({
    //       data: new Error(),
    //       status: 500,
    //       statusText: 'Internal Server Error',
    //       headers: {},
    //       config: { headers: {} } as AxiosRequestConfig,
    //     }),
    //   );

    //   // Act
    //   const response = await usuarioTotvsService.ValidaUsuarioTotvs(codigo);

    //   // Assert
    //   expect(response).toEqual(expectedResponse);
    // });
  });
});
