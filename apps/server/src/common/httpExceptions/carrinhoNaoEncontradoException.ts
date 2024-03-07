import { HttpException, HttpStatus } from '@nestjs/common';

export class CarrinhoNaoEncontradoException extends HttpException {
  constructor() {
    super('Carrinho não encontrado', HttpStatus.NOT_FOUND);
  }
}
