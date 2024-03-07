import { HttpException, HttpStatus } from '@nestjs/common';

export class CursoNaoEncontradoException extends HttpException {
  constructor() {
    super('Curso não encontrado', HttpStatus.NOT_FOUND);
  }
}
