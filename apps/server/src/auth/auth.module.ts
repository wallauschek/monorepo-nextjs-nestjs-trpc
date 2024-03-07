import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { UsuarioTotvsService } from '@server/totvs/usuarios/usuarios.service';
// import { ResponsaveisTotvsService } from '@server/totvs/responsaveis/responsaveis.service';
import { AlunosTotvsService } from '@server/totvs/alunos/alunosTotvs.service';
// import { ResponsaveisTotvsService } from '@/src/domain/totvs/responsaveis/responsaveis.service';
// import { EmailModule } from '@/src/domain/aplicacao/email/email.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        const privateKey = String(process.env.AT_SECRET_SECRET);
        const publicKey = String(process.env.AT_PUBLIC_SECRET);

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
    // EmailModule,
  ],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    UsuarioTotvsService,
    AlunosTotvsService,
    // ResponsaveisTotvsService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
