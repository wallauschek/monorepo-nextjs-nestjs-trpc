import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import appStore from '@web/stores/app';
import React, { useEffect, useState } from 'react';

const BoletimCELEM = () => {
  const { studentSelected } = appStore;
  const [dados, setDados] = useState<any>([]);
  const [dadosFaltas, setDadosFaltas] = useState<any>([]);
  const [dadosTrilhas, setDadosTrilhas] = useState<any>([]);

  useEffect(() => {
    studentSelected &&
    ChamadasBackEnd.buscaNotasBoletim(
      studentSelected.codColigada,
      studentSelected.periodoLetivo,
      studentSelected.registroAcademicoBasico
    ).then(
      (res) => {
        setDados(res.notas);
        // setIsLoading(false);
      }
    )
    studentSelected && ChamadasBackEnd.buscaFaltasCELBoletim(
      studentSelected.periodoLetivo,
      studentSelected.registroAcademicoBasico
    ).then(
      (res) => {

        console.log("🚀 ~ useEffect ~ res:", res)

        setDadosFaltas(res.faltas);
        // setIsLoading(false);
      }
    )
    studentSelected && ChamadasBackEnd.buscaTrilhasCELBoletim(
      studentSelected.periodoLetivo,
      studentSelected.registroAcademicoBasico
    ).then(
      (res) => {

        console.log("🚀 ~ useEffect ~ res:", res)

        setDadosTrilhas(res.trilhas);
        // setIsLoading(false);
      }
    )
  }, [studentSelected]);
  
  return (
    <div className="overflow-x-auto border-2 border-solid border-white ">
      { studentSelected && dados?.notas && dados.notas.length > 0 ? (
        <>
          <div className="min-w-full mx-auto text-xs">
            <div className="grid grid-cols-2 gap-2 py-4">
              <div>
                <strong>NOME:</strong> <span className={'text-gray-600'} >{studentSelected.nome}</span>
              </div>
              <div>
                <strong>TURMA:</strong> <span className={'text-gray-600'} >{studentSelected.codTurma}</span>
              </div>
              <div>
                <strong>MATRÍCULA:</strong> <span className={'text-gray-600'} >{studentSelected.registroAcademicoBasico}</span>
              </div>
              <div>
                <strong>SÉRIE:</strong> <span className={'text-gray-600'} >{studentSelected.serie}</span>
              </div>
              <div>
                <strong>Nº DA CHAMADA:</strong> <span className={'text-gray-600'} >{}</span>
              </div>
              <div>
                <strong>TURNO:</strong> <span className={'text-gray-600'} >{studentSelected.turno}</span>
              </div>
              <div>
                <strong>ANO:</strong> <span className={'text-gray-600'} >{studentSelected.periodoLetivo}</span>
              </div>
              <div>
                <strong>UNIDADE:</strong> <span className={'text-gray-600'} >{studentSelected.unidade}</span>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            <table className={'boletim table table-auto w-full  divide-y divide-gray-200 border border-gray-100 overflow-x-auto overflow-y-auto text-xs text-gray-600'}>
            <colgroup>
                <col span={1} />
                <col span={5} className="bg-blue-100"/>
                <col span={5} className="bg-green-100"/>
                <col span={5} className="bg-red-100"/>
                <col span={1} />
              </colgroup>
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border border-gray-100 min-w-[120px]" rowSpan={2} ></th>
                  <th className="p-2 border border-gray-100" colSpan={5}>Trimestre 1</th>
                  <th className="p-2 border border-gray-100" colSpan={5}>Trimestre 2</th>
                  <th className="p-2 border border-gray-100" colSpan={5}>Trimestre 3</th>
                  <th className="p-2 border border-gray-100" rowSpan={2}>MA</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]" rowSpan={2}>RF</th>
                  <th className="p-2 border border-gray-100 min-w-[80px]" rowSpan={2}>MF</th>
                </tr>
                <tr>
                  <th className="p-2 border border-gray-100 min-w-[60px]">P1</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">P2</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">T1</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">R1</th>
                  <th className="p-2 border border-gray-100 min-w-[60px] font-bold">MT1</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">P3</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">P4</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">T2</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">R2</th>
                  <th className="p-2 border border-gray-100 min-w-[60px] font-bold">MT2</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">P5</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">P6</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">T3</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">R3</th>
                  <th className="p-2 border border-gray-100 min-w-[60px] font-bold">MT3</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {dados.notas.length > 0 && dados.notas.map((item: any, idx: number) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className={`p-2 border border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>{item.DISCIPLINA || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.P1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.P2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.T1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.R1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MT1 || '-'}</td>

                    <td className="p-2 text-center border border-gray-100">{item.P3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.P4 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.T2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.R2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MT2 || '-'}</td>

                    <td className="p-2 text-center border border-gray-100">{item.P5 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.P6 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.T3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.R3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MT3 || '-'}</td>
                  
                  
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MA || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.RF || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MF || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          { studentSelected && dadosTrilhas?.trilhas?.length > 0 && (
          <div className={'pt-4'}>
              <table className={'table table-auto w-full overflow-x-auto overflow-y-auto text-xs text-gray-600'}>
                  <thead>
                    <tr>
                      <th className='text-left p-2'>
                        Trilhas específicas
                      </th>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="p-2 border border-gray-100">Disciplinas</th>
                      <th className="p-2 border border-gray-100">AVA</th>
                      <th className="p-2 border border-gray-100">MF</th>
                    </tr>
                  </thead>
                  <tbody>
                    { dadosTrilhas.trilhas.map((item: any, idx: number) => (
                    <tr>
                      <td className="p-2 text-center border border-gray-100">{item.NM_disciplina || ''}</td>
                      <td className="p-2 text-center border border-gray-100">{item.AVA || ''}</td>
                      <td className="p-2 text-center border border-gray-100">{item.MF || ''}</td>
                    </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          )}

{ studentSelected && dadosFaltas?.faltas?.length > 0 && (
          <div className={'pt-4'}>
              <table className={'table table-auto w-full overflow-x-auto overflow-y-auto text-xs text-gray-600'}>
                  <thead>
                  <tr>
                      <th className='text-left p-2 border-0'>
                        Frequência
                      </th>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="p-2 border border-gray-100">Total de Faltas</th>
                      <th className="p-2 border border-gray-100">1º trimestre</th>
                      <th className="p-2 border border-gray-100">2º trimestre</th>
                      <th className="p-2 border border-gray-100">3º trimestre</th>
                      <th className="p-2 border border-gray-100">Anual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 text-center border border-gray-100">Quantitativo</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].FALTA1T || '-'}</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].FALTA2T || '-'}</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].FALTA3T || '-'}</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].FALTAANUAL || '-'}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 text-center border border-gray-100">Percentual</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].PERCENTUAL1T || '-'}</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].PERCENTUAL2T || '-'}</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].PERCENTUAL3T || '-'}</td>
                      <td className="p-2 text-center border border-gray-100">{dadosFaltas.faltas[0].PERCENTUALANUAL || '-'}</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          )}
        </>
      )
      : (
        <div className="flex justify-center items-center h-64">
          <p>Não há dados para exibir</p>
        </div>
      )
    }
    </div>
  );
}

export default BoletimCELEM;