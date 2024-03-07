import { TestingModule, Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AppModule } from '@server/app.module';
import { ResponsaveisTotvsService } from './responsaveis.service';

describe('buscarDadosRespFinanCPF', () => {
  let responsaveisTotvsService: ResponsaveisTotvsService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    responsaveisTotvsService = moduleRef.get(ResponsaveisTotvsService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('deve retornar dados quando um CPF válido for fornecido', async () => {
    // Arrange
    const cpf = '08417154752';
    const expectedData = {
      status: true,
      responsavel: {
        ATIVO: 1,
        BAIRRO: 'LARANJEIRAS',
        CEP: '22231200',
        CGCCFO: '084.171.547-52',
        CIDADE: 'Rio de Janeiro',
        CODCFO: '00015353',
        CODETD: 'RJ',
        CODMUNICIPIO: '04557',
        CODUSUARIOACESSO: '08417154752',
        COMPLEMENTO: '301',
        EMAIL: 'PEDRO.WALLAUSCHEK@CEL.G12.BR',
        IDPAIS: 1,
        NOME: 'PEDRO FONSECA WALLAUSCHEK',
        NUMERO: '60',
        PAIS: 'Brasil',
        PESSOAFISOUJUR: 'F',
        RUA: 'MOURA BRASIL',
        TELEFONE: '2121487317',
        TELEX: '21988812553',
        TIPOBAIRRO: null,
        TIPORUA: null,
        id: '0$_$00015353',
      },
    };

    // Act
    const result = await responsaveisTotvsService.buscarDadosRespFinanCPF(cpf);

    // Assert
    expect(result).toEqual(expectedData);
  });

  it('deve lidar e retornar a resposta do erro quando a API retornar um erro', async () => {
    // Arrange
    const cpf = '12345678900';

    // Act
    const result = await responsaveisTotvsService.buscarDadosRespFinanCPF(cpf);

    // Assert
    expect(result).toEqual(new NotFoundException());
  });

  // Should handle and return an error when an invalid CPF is provided
  it('should handle and return an error when an invalid CPF is provided', async () => {
    // Arrange
    const cpf = '123'; // Invalid CPF

    // Act
    const result = await responsaveisTotvsService.buscarDadosRespFinanCPF(cpf);

    // Assert
    expect(result).toBeInstanceOf(Error);
  });
});
