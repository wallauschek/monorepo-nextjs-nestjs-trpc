import { getTotvsTableName } from '@server/common/get-tableCorpore';
import { PrismaService } from '@server/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AlunosTotvsService {
  tableCorpore: string;

  constructor(private prisma: PrismaService) {
    this.tableCorpore = getTotvsTableName();
  }

  async getAlunosAtivos(usuario: string) {
    try {
      const alunos = await this.prisma.$queryRawUnsafe<any[]>(`
          DECLARE @USUARIO NVARCHAR(11) = '${usuario}'

          SELECT
          MPL.CODCOLIGADA AS codColigada,
          MPL.CODFILIAL AS codFilial,
          CASE
              WHEN MPL.CODCOLIGADA = 1 AND MPL.CODFILIAL = 1 THEN 'MA'
              WHEN MPL.CODCOLIGADA = 1 AND MPL.CODFILIAL = 2 THEN 'BA'
              WHEN MPL.CODCOLIGADA = 1 AND MPL.CODFILIAL = 5 THEN 'LQ'
              WHEN MPL.CODCOLIGADA = 1 AND MPL.CODFILIAL = 7 THEN 'NS'
              WHEN MPL.CODCOLIGADA = 5 AND MPL.CODFILIAL = 1 THEN 'FB'
          END unidade,
          S.DESCRICAO AS status,
          PL.CODPERLET periodoLetivo,
          ISNULL(MPL.CODTURMA, '') AS codTurma,
          P.NOME as nome,
          P.DTNASCIMENTO as dataNascimento,
          P.CODIGO as codPessoa,
          MPL.RA as registroAcademicoBasico,
          CASE 
              WHEN MPL.CODCOLIGADA = 5 THEN A2.RA
              WHEN MPL.CODCOLIGADA = 1 THEN A.RA
          END as registroAcademicoExtra,
          ISNULL(T2.CODTURNO, '') AS codTurno,
          ISNULL(T2.NOME, '') AS turno,
          HBF.IDHABILITACAOFILIAL AS idHabilitacaoFilial,
          C.CODCURSO AS codCurso,
          HBF.CODTIPOCURSO AS codtipocurso,
          C.NOME AS curso,
          HBF.CODHABILITACAO AS codSerie,
          H.NOME AS serie,
          MPL.IDPERLET as idPeriodoLetivo,
          MAX(CASE F.CODUSUARIOACESSO WHEN @USUARIO THEN 1 ELSE 0 END) AS respFinanceiro,
          MAX(CASE PACAD.CODUSUARIO WHEN @USUARIO THEN 1 ELSE 0 END) AS respAcademico,
          MAX(CASE PFIL.CODUSUARIO WHEN @USUARIO THEN 1 ELSE 0 END) AS filiacao,
          MAX(CASE A.RA WHEN @USUARIO THEN 1 ELSE 0 END) AS aluno
            FROM ${this.tableCorpore}.dbo.SMATRICPL(NOLOCK) MPL
            INNER JOIN ${this.tableCorpore}.dbo.SPLETIVO (NOLOCK) PL ON PL.CODCOLIGADA = MPL.CODCOLIGADA AND PL.IDPERLET = MPL.IDPERLET
            LEFT OUTER JOIN ${this.tableCorpore}.dbo.STURMA (NOLOCK) T ON T.CODCOLIGADA = MPL.CODCOLIGADA AND T.CODTURMA = MPL.CODTURMA AND T.IDPERLET = MPL.IDPERLET
            INNER JOIN ${this.tableCorpore}.dbo.SHABILITACAOFILIAL (NOLOCK) HBF ON HBF.CODCOLIGADA = MPL.CODCOLIGADA AND HBF.IDHABILITACAOFILIAL = MPL.IDHABILITACAOFILIAL
            INNER JOIN ${this.tableCorpore}.dbo.SHABILITACAO (NOLOCK) H ON H.CODCOLIGADA = HBF.CODCOLIGADA AND H.CODCURSO = HBF.CODCURSO AND H.CODHABILITACAO = HBF.CODHABILITACAO
            INNER JOIN ${this.tableCorpore}.dbo.SCURSO (NOLOCK) C ON C.CODCOLIGADA = HBF.CODCOLIGADA AND C.CODCURSO = HBF.CODCURSO
            INNER JOIN ${this.tableCorpore}.dbo.STURNO (NOLOCK) T2 ON T2.CODCOLIGADA = HBF.CODCOLIGADA AND T2.CODTURNO = HBF.CODTURNO
            INNER JOIN ${this.tableCorpore}.dbo.SSTATUS (NOLOCK) S ON S.CODCOLIGADA = MPL.CODCOLIGADA AND S.CODSTATUS = MPL.CODSTATUS
            INNER JOIN ${this.tableCorpore}.dbo.SALUNO (NOLOCK) A         ON A.CODCOLIGADA = MPL.CODCOLIGADA AND A.RA = MPL.RA
            INNER JOIN ${this.tableCorpore}.dbo.PPESSOA (NOLOCK) P  ON P.CODIGO = A.CODPESSOA
            LEFT JOIN ${this.tableCorpore}.dbo.FCFO f ON f.CODCFO = A.CODCFO
            LEFT JOIN ${this.tableCorpore}.dbo.PPESSOA (NOLOCK) PACAD ON PACAD.CODIGO = a.CODPESSOARACA
            LEFT JOIN ${this.tableCorpore}.dbo.VFILIACAO		as ALFI	on	A.CODPESSOA  = ALFI.CODPESSOAFILHO 
            LEFT JOIN ${this.tableCorpore}.dbo.PPESSOA		as PFIL	on	ALFI.CODPESSOAFILIACAO = PFIL.CODIGO
            LEFT JOIN ${this.tableCorpore}.dbo.SALUNO (NOLOCK) A2         ON A2.CODCOLIGADA = 6 AND P.CODIGO = A2.CODPESSOA
          WHERE 
            (
                F.CODUSUARIOACESSO = @USUARIO
                OR PACAD.CODUSUARIO = @USUARIO
                OR PFIL.CODUSUARIO = @USUARIO
                OR A.RA = @USUARIO 
            )
            and PL.EXIBIRPORTAL = 'S'
            and s.descricao in ('ATIVO')
            AND C.NOME IN ('EDUCAÇÃO INFANTIL', 'ENSINO FUNDAMENTAL', 'ENSINO MÉDIO')
            AND (A2.CODTIPOALUNO != 4 OR A2.CODTIPOALUNO IS NULL)
          GROUP BY MPL.CODCOLIGADA, MPL.CODFILIAL, MPL.CODTURMA, P.NOME, P.DTNASCIMENTO, P.CODIGO, MPL.RA, A.RA, A2.RA, T2.CODTURNO, T2.NOME, HBF.IDHABILITACAOFILIAL, C.CODCURSO, HBF.CODTIPOCURSO, C.NOME, HBF.CODHABILITACAO, H.NOME, MPL.IDPERLET, S.DESCRICAO, PL.CODPERLET
    `);

      return {
        quantidade: alunos.length,
        alunos,
      };
    } catch (error) {
      return error;
    }
  }

  async getNotasBoletim(
    coligada: number,
    periodoLetivo: string,
    serie: string,
    ra: string,
  ) {
    const consultaPorSerie = [
      {
        coligada: 5,
        serie: '1A1',
        sql: 'VW_PED_BOLETIM_FB_EFAI',
      },
      {
        coligada: 5,
        serie: '2A1',
        sql: 'VW_PED_BOLETIM_FB_EFAI',
      },
      {
        coligada: 5,
        serie: '3A1',
        sql: 'VW_PED_BOLETIM_FB_EFAI',
      },
      {
        coligada: 5,
        serie: '4A1',
        sql: 'VW_PED_BOLETIM_FB_EFAI',
      },
      {
        coligada: 5,
        serie: '5A1',
        sql: 'VW_PED_BOLETIM_FB_EFAI',
      },
      {
        coligada: 5,
        serie: '6A1',
        sql: 'VW_PED_BOLETIM_FB_EFAF',
      },
      {
        coligada: 5,
        serie: '7A1',
        sql: 'VW_PED_BOLETIM_FB_EFAF',
      },
      {
        coligada: 5,
        serie: '8A1',
        sql: 'VW_PED_BOLETIM_FB_EFAF',
      },
      {
        coligada: 5,
        serie: '9A1',
        sql: 'VW_PED_BOLETIM_FB_EFAF',
      },
      {
        coligada: 5,
        serie: '1S2',
        sql: 'VW_PED_BOLETIM_FB_EFAF',
      },
      {
        coligada: 5,
        serie: '2S2',
        sql: 'VW_PED_BOLETIM_FB_EFAF',
      },
      {
        coligada: 5,
        serie: '3S2',
        sql: 'VW_PED_BOLETIM_FB_3S2',
      },

      {
        coligada: 1,
        serie: '1A1',
        sql: 'VW_PED_BOLETIM_CEL_1A1',
      },
      {
        coligada: 1,
        serie: '2A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAI',
      },
      {
        coligada: 1,
        serie: '3A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAI',
      },
      {
        coligada: 1,
        serie: '4A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAI',
      },
      {
        coligada: 1,
        serie: '5A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAI',
      },
      {
        coligada: 1,
        serie: '6A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAF',
      },
      {
        coligada: 1,
        serie: '7A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAF',
      },
      {
        coligada: 1,
        serie: '8A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAF',
      },
      {
        coligada: 1,
        serie: '9A1',
        sql: 'VW_PED_BOLETIM_CEL_EFAF',
      },
      {
        coligada: 1,
        serie: '1S2',
        sql: 'VW_PED_BOLETIM_CEL_EM',
      },
      {
        coligada: 1,
        serie: '2S2',
        sql: 'VW_PED_BOLETIM_CEL_EM',
      },
      {
        coligada: 1,
        serie: '3S2',
        sql: 'VW_PED_BOLETIM_CEL_3S2',
      },
    ];

    try {
      const notas = await this.prisma.$queryRawUnsafe<any[]>(`
      select distinct * from ${this.tableCorpore}.dbo.${
        consultaPorSerie.find(
          (item) => item.serie === serie && item.coligada === coligada,
        )?.sql
      }
        WHERE 
        CODCOLIGADA = ${coligada}
        AND RA = '${ra}'
        AND CODPERLET = '${periodoLetivo}'
        ORDER BY DISCIPLINA
      `);

      return {
        quantidade: notas.length,
        notas,
      };
    } catch (error) {
      return error;
    }
  }

  async getFaltasCELBoletim(periodoLetivo: string, ra: string) {
    try {
      const faltas = await this.prisma.$queryRawUnsafe<any[]>(`
      select distinct * from ${this.tableCorpore}.dbo.VW_PED_FLATAS_CEL
        WHERE 
        RA = '${ra}'
        AND CODPERLET = '${periodoLetivo}'
      `);

      return {
        quantidade: faltas.length,
        faltas,
      };
    } catch (error) {
      return error;
    }
  }

  async getTrilhasCELBoletim(periodoLetivo: string, ra: string) {
    try {
      const trilhas = await this.prisma.$queryRawUnsafe<any[]>(`
      select distinct * from ${this.tableCorpore}.dbo.VW_PED_CEL_TRILHA
        WHERE 
        RA = '${ra}'
        AND CODPERLET = '${periodoLetivo}'
      `);

      return {
        quantidade: trilhas.length,
        trilhas,
      };
    } catch (error) {
      return error;
    }
  }

  async verificaAlunoPorRegistroAcademico(
    coligada: number,
    registroAcademico: string,
  ) {
    const response = axios({
      method: 'get',
      url: `${process.env.URL_API_TOTVS}/rmsrestdataserver/rest/EduAlunoData/${coligada}$_$${registroAcademico}`,
      headers: {
        CODCOLIGADA: coligada,
        CODFILIAL: '1',
        CODTIPOCURSO: '1',
        CODSISTEMA: 'S',
        Authorization: `Basic ${process.env.TOKEN_API_TOTVS}`,
      },
    })
      .then((response) => {
        let respostaTratada;

        if (response.data.messages.length == 0) {
          respostaTratada = {
            status: true,
            data: {
              BAIRRO: response.data.data.BAIRRO,
              CEP: response.data.data.CEP,
              CODCFO: response.data.data.CODCFO,
              CODCOLIGADA: response.data.data.CODCOLIGADA,
              CODIGO: response.data.data.CODIGO,
              CODMUNICIPIO: response.data.data.CODMUNICIPIO,
              CODNATURALIDADE: response.data.data.CODNATURALIDADE,
              CODPESSOA: response.data.data.CODPESSOA,
              CODUSUARIO: response.data.data.CODUSUARIO,
              COMPLEMENTO: response.data.data.COMPLEMENTO,
              CORRACA: response.data.data.CORRACA,
              CPF: response.data.data.CPF,
              DTNASCIMENTO: response.data.data.DTNASCIMENTO,
              EMAIL: response.data.data.EMAIL,
              ESTADO: response.data.data.ESTADO,
              ESTADONATAL: response.data.data.ESTADONATAL,
              NACIONALIDADE: response.data.data.NACIONALIDADE,
              NATURALIDADE: response.data.data.NATURALIDADE,
              NOME: response.data.data.NOME,
              NUMERO: response.data.data.NUMERO,
              PAIS: response.data.data.PAIS,
              RA: response.data.data.RA,
              RUA: response.data.data.RUA,
              SEXO: response.data.data.SEXO,
              SOBRENOME: response.data.data.SOBRENOME,
              TELEFONE1: response.data.data.TELEFONE1,
              TELEFONE2: response.data.data.TELEFONE2,
            },
          };
        } else {
          respostaTratada = {
            status: false,
            data: response.data,
          };
        }
        return respostaTratada;
      })
      .catch((error) => {
        return {
          status: false,
          data: error.response.data,
        };
      });

    return response;
  }
}
