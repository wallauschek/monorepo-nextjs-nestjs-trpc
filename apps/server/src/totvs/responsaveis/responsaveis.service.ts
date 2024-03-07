import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

interface returnResponsavel {
  status: boolean;
  responsavel: {
    id: number;
    ATIVO: string;
    CODCFO: string;
    CGCCFO: string;
    NOME: string;
    EMAIL: string;
    TELEFONE: string;
    TELEX: string;
    CEP: string;
    PAIS: string;
    CIDADE: string;
    TIPOBAIRRO: string;
    BAIRRO: string;
    TIPORUA: string;
    RUA: string;
    NUMERO: string;
    COMPLEMENTO: string;
    CODETD: string;
    CODMUNICIPIO: string;
    CODUSUARIOACESSO: string;
    IDPAIS: number;
    PESSOAFISOUJUR: string;
  };
}

@Injectable()
export class ResponsaveisTotvsService {
  async buscarDadosRespFinanCPF(
    cpf: string,
  ): Promise<returnResponsavel | Error> {
    //["NOME=:nome AND CPF=:cpf", "Marcelo Martins dos Santos REACT","01876345721"]
    const cpfComMascara =
      cpf.substring(0, 3) +
      '.' +
      cpf.substring(3, 6) +
      '.' +
      cpf.substring(6, 9) +
      '-' +
      cpf.substring(9);

    const response = axios({
      method: 'get',
      url: `${process.env.URL_API_TOTVS}/rmsrestdataserver/rest/FinCFODataBR?filter=["CGCCFO=:cpf","${cpfComMascara}"]`,
      headers: {
        Authorization: `Basic ${process.env.TOKEN_API_TOTVS}`,
        CODCOLIGADA: '0',
        CODFILIAL: '1',
        CODTIPOCURSO: '1',
        CODSISTEMA: 'S',
      },
    })
      .then((response) => {
        if (response.data.messages.length > 0) {
          return new NotFoundException(response.data.messages[0].message);
        }

        return {
          status: true,
          responsavel: {
            id: response.data.data[0].id,
            ATIVO: response.data.data[0].ATIVO,
            CODCFO: response.data.data[0].CODCFO,
            CGCCFO: response.data.data[0].CGCCFO,
            NOME: response.data.data[0].NOME,
            EMAIL: response.data.data[0].EMAIL,
            TELEFONE: response.data.data[0].TELEFONE,
            TELEX: response.data.data[0].TELEX,
            CEP: response.data.data[0].CEP,
            PAIS: response.data.data[0].PAIS,
            CIDADE: response.data.data[0].CIDADE,
            TIPOBAIRRO: response.data.data[0].TIPOBAIRRO,
            BAIRRO: response.data.data[0].BAIRRO,
            TIPORUA: response.data.data[0].TIPORUA,
            RUA: response.data.data[0].RUA,
            NUMERO: response.data.data[0].NUMERO,
            COMPLEMENTO: response.data.data[0].COMPLEMENTO,
            CODETD: response.data.data[0].CODETD,
            CODMUNICIPIO: response.data.data[0].CODMUNICIPIO,
            CODUSUARIOACESSO: response.data.data[0].CODUSUARIOACESSO,
            IDPAIS: response.data.data[0].IDPAIS,
            PESSOAFISOUJUR: response.data.data[0].PESSOAFISOUJUR,
          },
        };
      })
      .catch((error) => {
        return new Error(error);
      });

    return response;
  }
}
