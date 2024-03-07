import { Module } from '@nestjs/common';
import { UsuarioTotvsService } from './usuarios/usuarios.service';
import { ResponsaveisTotvsService } from './responsaveis/responsaveis.service';
import { HttpModule } from '@nestjs/axios';
import { AlunosTotvsService } from './alunos/alunosTotvs.service';

@Module({
  imports: [HttpModule],
  providers: [
    UsuarioTotvsService,
    ResponsaveisTotvsService,
    AlunosTotvsService,
  ],
  exports: [UsuarioTotvsService, ResponsaveisTotvsService, AlunosTotvsService],
})
export class TotvsModule {}
