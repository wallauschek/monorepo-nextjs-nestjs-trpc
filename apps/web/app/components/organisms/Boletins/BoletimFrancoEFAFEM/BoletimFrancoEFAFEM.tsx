import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import appStore from '@web/stores/app';
import React, { useEffect, useState } from 'react';

const BoletimFrancoEFAFEM = () => {
  const { studentSelected } = appStore;
  const [dados, setDados] = useState<any>([]);

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
            </div>
          </div>
          <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            <table className={'boletim table table-auto w-full  divide-y divide-gray-200 border border-gray-100 overflow-x-auto overflow-y-auto text-xs text-gray-600'}>
              <colgroup>
                <col span={1} />
                <col span={7} className="bg-blue-100"/>
                <col span={7} className="bg-green-100"/>
                <col span={6} className="bg-red-100"/>
                <col span={3} />
              </colgroup>
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border border-gray-100 min-w-[120px]" rowSpan={2} ></th>
                  <th className="p-2 border border-gray-100" colSpan={7}>Trimestre 1</th>
                  <th className="p-2 border border-gray-100" colSpan={7}>Trimestre 2</th>
                  <th className="p-2 border border-gray-100" colSpan={6}>Trimestre 3</th>
                  <th className="p-2 border border-gray-100" rowSpan={2}>TP</th>
                  <th className="p-2 border border-gray-100" colSpan={2}>Recuperação Final</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]" rowSpan={2}>MF</th>
                  <th className="p-2 border border-gray-100 min-w-[80px]" rowSpan={2}>status</th>
                </tr>
                <tr>
                  <th className="p-2 border border-gray-100 min-w-[60px]">N</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">S</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">MS</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">RP</th>
                  <th className="p-2 border border-gray-100 min-w-[60px] font-bold ">MT</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">T</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">F</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">N</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">S</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">MS</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">RP</th>
                  <th className="p-2 border border-gray-100 min-w-[60px] font-bold ">MT</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">T</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">F</th><th className="p-2 border border-gray-100 min-w-[60px]">N</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">S</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">MS</th>
                  <th className="p-2 border border-gray-100 min-w-[60px] font-bold ">MT</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">T</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">F</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">MN</th>
                  <th className="p-2 border border-gray-100 min-w-[60px]">RF</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {dados.notas.length > 0 && dados.notas.map((item: any, idx: number) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className={`p-2 border border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>{item.DISCIPLINA || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.T1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.S1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MT1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.RP1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MFT1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MT1_TURMA || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.FT1 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.T2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.S2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MT2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.RP2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MFT2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MT2_TURMA || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.FT2 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.T3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.S3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MT3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MFT3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MT3_TURMA || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.FT3 || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.TP || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.MIN_NECESSARIO || '-'}</td>
                    <td className="p-2 text-center border border-gray-100">{item.RF || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.MF || '-'}</td>
                    <td className="p-2 text-center border border-gray-100 font-bold">{item.status || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-gray-50  text-xs">
            <p className="font-semibold">Legenda:</p>
            <ul className="flex flex-wrap justify-start list-disc list-inside">
              <li><strong>N:</strong> Notas do Trimestre</li>
              <li><strong>RP:</strong> Recuperação Paralela</li>
              <li><strong>MT:</strong> Média Final do Trimestre</li>
              <li><strong>T:</strong> Média da Turma</li>
              <li><strong>F:</strong> Faltas</li>
              <li><strong>TP:</strong> Total de Pontos</li>
              <li><strong>MN:</strong> Mínimo Necessário</li>
              <li><strong>RF:</strong> Recuperação Final</li>
              <li><strong>MF:</strong> Média Final</li>
            </ul>
          </div>
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
};

export default BoletimFrancoEFAFEM;