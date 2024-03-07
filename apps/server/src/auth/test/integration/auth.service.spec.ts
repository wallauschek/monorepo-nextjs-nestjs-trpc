import { Test, TestingModule } from '@nestjs/testing';
// import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { decode } from 'jsonwebtoken';

import { AppModule } from '@server/app.module';
import { AuthService } from '@server/auth/auth.service';
import { Tokens } from '@server/auth/types';
import { Usuario } from '@prisma/client';

import { PrismaService } from '@server/prisma/prisma.service';

const user = {
  usuario: '08417154752',
  email: 'test@gmail.com',
  password: 'super-secret-password',
  nome: 'Nome Teste',
};

describe('Auth Flow', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    execSync('npx prisma db push');

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    prisma.cleanDatabase();
  });

  afterAll(async () => {
    if (moduleRef) {
      await moduleRef.close();
    }
  });

  describe('cadastro de usuário interno', () => {
    it('deve lançar err se nenhum usuário for existente', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signInLocal({
          usuario: 'invalid_email',
          password: 'invalid_password',
        });
      } catch (error: any) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('deve logar com usuário interno', async () => {
      const tokens = await authService.signInLocal({
        usuario: '08417154752',
        password: '123456',
      });

      const user = await prisma.usuario.findUnique({
        where: {
          usuario: '08417154752',
        },
      });

      expect(user).toBeDefined();

      expect(tokens.access_token).toBeTruthy();
      expect(tokens.refresh_token).toBeTruthy();
    });

    it('deve lançar erro se a senha for incorreta', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signInLocal({
          usuario: user.email,
          password: user.password + 'a',
        });
      } catch (error: any) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('deve passar se a chamada for para o usuário não existente', async () => {
      const result = await authService.logout('123456');
      expect(result).toBeDefined();
    });

    it('deve fazer logout', async () => {
      await prisma.cleanDatabase();
      await authService.signupLocal({
        ...user,
        perfis: [
          {
            escola: 'CEL',
            perfis: ['responsavel_academico'],
          },
          {
            escola: 'FRANCO',
            perfis: ['responsavel_financeiro'],
          },
        ],
      });

      let userFromDb: Usuario | null;

      userFromDb = await prisma.usuario.findFirst({
        where: {
          email: user.email,
        },
      });
      expect(userFromDb?.hashedRt).toBeTruthy();

      // logout
      await authService.logout(userFromDb!.id);

      userFromDb = await prisma.usuario.findFirst({
        where: {
          email: user.email,
        },
      });

      expect(userFromDb?.hashedRt).toBeFalsy();
    });
  });

  describe('refresh token', () => {
    it('deve lançar erro se nenhum usuário for encontrado', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens('123456', '');
      } catch (error: any) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('deve lançar erro se o usuário registrado não estiver logado', async () => {
      await prisma.cleanDatabase();
      const _tokens = await authService.signupLocal({
        ...user,
        perfis: [
          {
            escola: 'CEL',
            perfis: ['responsavel_academico'],
          },
          {
            escola: 'FRANCO',
            perfis: ['responsavel_financeiro'],
          },
        ],
      });

      const rt = _tokens.refresh_token;

      const decoded = decode(rt);
      const userId = String(decoded?.sub);

      if (userId) await authService.logout(userId);

      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens(userId, rt);
      } catch (error: any) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('deve lançar erro se o token de atualização incorreto', async () => {
      await prisma.cleanDatabase();

      const _tokens = await authService.signupLocal({
        ...user,
        perfis: [
          {
            escola: 'CEL',
            perfis: ['responsavel_academico'],
          },
          {
            escola: 'FRANCO',
            perfis: ['responsavel_financeiro'],
          },
        ],
      });

      const rt = _tokens.refresh_token;

      const decoded = decode(rt);
      const userId = String(decoded?.sub);

      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens(userId, rt + 'a');
      } catch (error: any) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('deve atualizar os tokens', async () => {
      await prisma.cleanDatabase();
      // log in the user again and save rt + at
      const _tokens = await authService.signupLocal({
        ...user,
        perfis: [
          {
            escola: 'CEL',
            perfis: ['responsavel_academico'],
          },
          {
            escola: 'FRANCO',
            perfis: ['responsavel_financeiro'],
          },
        ],
      });

      const rt = _tokens.refresh_token;
      const at = _tokens.access_token;

      const decoded = decode(rt);
      const userId = String(decoded?.sub);

      // since jwt uses seconds signature we need to wait for 1 second to have new jwts
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      const tokens = await authService.refreshTokens(userId, rt);
      expect(tokens).toBeDefined();

      // refreshed tokens should be different
      expect(tokens.access_token).not.toBe(at);
      expect(tokens.refresh_token).not.toBe(rt);
    });
  });
});
