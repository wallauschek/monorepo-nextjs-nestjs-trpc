import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CursoNaoEncontradoException } from './cursoNaoEncontradoException';

@Catch(CursoNaoEncontradoException)
export class CursoNaoEncontradoFilter implements ExceptionFilter {
  catch(exception: CursoNaoEncontradoException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'O curso que você está procurando não foi encontrado',
    });
  }
}
