import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AlunoNaoEncontradoException } from './AlunoNaoEncontradoException';

@Catch(AlunoNaoEncontradoException)
export class AlunoNaoEncontradoFilter implements ExceptionFilter {
  catch(exception: AlunoNaoEncontradoException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'O aluno não foi encontrado',
    });
  }
}
