import { HttpException, HttpStatus } from '@nestjs/common';

export class AlunoNaoEncontradoException extends HttpException {
  constructor() {
    super('Aluno não encontrado', HttpStatus.NOT_FOUND);
  }
}
