import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/src/app.module';
import { AlunosTotvsService } from './alunosTotvs.service';
describe('AlunosTotvsService', () => {
  let alunosTotvsService: AlunosTotvsService;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    alunosTotvsService = moduleRef.get(AlunosTotvsService);
    alunosTotvsService.tableCorpore = 'CORPORE_ERP_MANUTENCAO';
  });

  afterAll(async () => {
    await moduleRef.close();
  });
  describe('getAlunos', () => {
    // Should return an array of objects with the expected properties
    it('deve devolver uma variedade de Alunos com as propriedades esperadas', async () => {
      // Call the getAlunos method
      const result = await alunosTotvsService.getAlunos({
        coligada: 5,
        usuario: '08417154752',
        periodo: '2023',
      });

      // Assert the result
      expect(result).toEqual({
        alunos: [
          {
            aluno: 'ALICE VAZ WALLAUSCHEK',
            codColigada: 5,
            codCurso: 'FB.2',
            codFilial: 1,
            codSerie: '2A1',
            codTurma: '25',
            codTurno: 2,
            codtipocurso: 1,
            curso: 'ENSINO FUNDAMENTAL',
            dataNascimento: new Date('2016-01-16T00:00:00.000Z'),
            idHabilitacaoFilial: 229,
            idPeriodoLetivo: 12,
            periodoLetivo: '2023',
            codPessoa: 76754,
            registroAcademicoBasico: '2018500128',
            registroAcademicoExtra: '2018600185',
            serie: '2º ANO',
            status: 'Ativo',
            turno: 'Tarde',
            unidade: 'LFB',
          },
          {
            aluno: 'ARTHUR VAZ WALLAUSCHEK',
            codColigada: 5,
            codCurso: 'FB.1',
            codFilial: 1,
            codSerie: 'PE2',
            codTurma: 'P2_A',
            codTurno: 2,
            codtipocurso: 1,
            curso: 'EDUCAÇÃO INFANTIL',
            dataNascimento: new Date('2017-07-12T00:00:00.000Z'),
            idHabilitacaoFilial: 231,
            idPeriodoLetivo: 12,
            periodoLetivo: '2023',
            codPessoa: 91368,
            registroAcademicoBasico: '2020500112',
            registroAcademicoExtra: '2021600883',
            serie: 'PRÉ-ESCOLA II',
            status: 'Ativo',
            turno: 'Tarde',
            unidade: 'LFB',
          },
        ],
        quantidade: 2,
      });
    });

    // Should return an empty array when no results are found
    it('deve retornar uma matriz vazia quando nenhum resultado for encontrado', async () => {
      // Call the getAlunos method
      const result = await alunosTotvsService.getAlunos({
        coligada: 1,
        usuario: 'mockUser',
        periodo: '2022',
      });

      // Assert the result
      expect(result).toEqual({
        quantidade: 0,
        alunos: [],
      });
    });
  });

  describe('verificaAlunoPorRegistroAcademico', () => {
    it('deve retornar um objeto com as propriedades esperadas do aluno', async () => {
      const aluno = await alunosTotvsService.verificaAlunoPorRegistroAcademico(
        6,
        '2018600185',
      );

      expect(aluno).toEqual({
        status: true,
        data: {
          BAIRRO: 'LARANJEIRAS',
          CEP: '22231200',
          CODCFO: '00019714',
          CODCOLIGADA: 6,
          CODIGO: 76754,
          CODMUNICIPIO: '04557',
          CODNATURALIDADE: '04557',
          CODPESSOA: 76754,
          CODUSUARIO: '2018500128',
          COMPLEMENTO: '301',
          CORRACA: 2,
          CPF: '19031566705',
          DTNASCIMENTO: '2016-01-16T00:00:00-02:00',
          EMAIL: '2018500128@aluno.lfb.g12.br',
          ESTADO: 'RJ',
          ESTADONATAL: 'RJ',
          NACIONALIDADE: '10',
          NATURALIDADE: 'Rio de Janeiro',
          NOME: 'ALICE VAZ WALLAUSCHEK',
          NUMERO: '60',
          PAIS: 'Brasil',
          RA: '2018600185',
          RUA: 'RUA MOURA BRASIL',
          SEXO: 'F',
          SOBRENOME: 'WALLAUSCHEK',
          TELEFONE1: '21988802010',
          TELEFONE2: '21988812553',
        },
      });
    });
  });
});
