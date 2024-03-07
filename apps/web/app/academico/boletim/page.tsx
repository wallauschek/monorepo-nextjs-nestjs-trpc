'use client';

import ChamadasBackEnd from "@web/apis/ChamadasBackEnd";
import LoadPage from "@web/app/components/molecules/LoadPage/LoadPage";
import Section from "@web/app/components/organisms/Section/Section";
import { MainLayout } from "@web/app/components/templates/MainLayout";
import appStore from "@web/stores/app";
import Aos from "aos";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";



export default observer(function BoletimBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const { school, setSchool } = appStore;
  const [dados, setDados] = useState<any>([]);

  console.log(dados);

  useEffect(() => {
    Aos.init({ duration: 1500 });
    const school = process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? 'franco' : 'cel';

    document.querySelector('html')?.setAttribute('data-theme', school);
    setSchool(school);

    ChamadasBackEnd.buscaNotasBoletim().then(
      (res) => {
        setDados(res);
        setIsLoading(false);
      }
    )
  }, []);

  if (isLoading) return <LoadPage />;
  
  return (
    <MainLayout className="relative h-screen space-y-10  ">
      <Section
        data-aos="fade-up"
        className="grid w-full"
      >
    {!dados.status
     ? ( 
      <div className="text-center">
        <h1 className="text-2xl font-bold">Aluno ou boletim não encontrado</h1>
      </div>
    ) : (
    <div className="overflow-x-auto border-2 border-solid border-white ">
      <div className="min-w-full mx-auto text-xs">
        <div className="border-b border-gray-400">
          <h1 className="text-lg font-bold text-center">BOLETIM ESCOLAR</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 py-4">
          <div>
            <strong>NOME:</strong> {dados?.notas.notas[0].ALUNO}
          </div>
          <div>
            <strong>TURMA:</strong> {dados?.notas.notas[0].CODTURMA}
          </div>
          <div>
            <strong>MATRÍCULA:</strong> {dados?.notas.notas[0].RA}
          </div>
          <div>
            <strong>SÉRIE:</strong> {dados?.notas.notas[0].SERIE}
          </div>
          <div>
            <strong>Nº DA CHAMADA:</strong> {dados?.notas.notas[0].NUMERO_ALUNO}
          </div>
          <div>
            <strong>TURNO:</strong> {dados?.notas.notas[0].TURNO}
          </div>
          <div>
            <strong>ANO:</strong> {dados?.notas.notas[0].CODPERLET}
          </div>
        </div>
      </div>
      <table className={'boletim divide-y divide-gray-200 border border-gray-100 overflow-x-auto overflow-y-auto text-xs'}>
      <colgroup>
          <col span={2} />
          <col span={5} className="bg-blue-100"/>
          <col span={5} className="bg-green-100"/>
          <col span={5} className="bg-red-100"/>
          <col span={3} />
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border border-gray-100 min-w-[120px] bg-gray-50" rowSpan={2} >DISCIPLINA</th>
            <th className="p-2 border border-gray-100 min-w-[200px]" rowSpan={2}>PROFESSOR</th>
            <th className="p-2 border border-gray-100" colSpan={5}>Trimestre 1</th>
            <th className="p-2 border border-gray-100" colSpan={5}>Trimestre 2</th>
            <th className="p-2 border border-gray-100" colSpan={4}>Trimestre 3</th>
            <th className="p-2 border border-gray-100" rowSpan={2}>TP</th>
            <th className="p-2 border border-gray-100" colSpan={2}>Recuperação Final</th>
            <th className="p-2 border border-gray-100 min-w-[60px]" rowSpan={2}>MF</th>
            <th className="p-2 border border-gray-100 min-w-[80px]" rowSpan={2}>status</th>
          </tr>
          <tr>
            <th className="p-2 border border-gray-100 min-w-[60px]">N</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">RP</th>
            <th className="p-2 border border-gray-100 min-w-[60px] font-bold ">MT</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">T</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">F</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">N</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">RP</th>
            <th className="p-2 border border-gray-100 min-w-[60px] font-bold ">MT</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">T</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">F</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">N</th>
            <th className="p-2 border border-gray-100 min-w-[60px] font-bold ">MT</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">T</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">F</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">MN</th>
            <th className="p-2 border border-gray-100 min-w-[60px]">RF</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {dados?.notas.quantidade > 0 && dados.notas.notas.map((item: any, idx: number) => (
            <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
              <td className={`p-2 border border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>{item.DISCIPLINA || '-'}</td>
              <td className="p-2 border border-gray-100">{item.PROFESSOR || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.T1 || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.RP1 || '-'}</td>
              <td className="p-2 text-center border border-gray-100 font-bold">{item.MFT1 || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.MT1_TURMA || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.FT1 || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.T2 || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.RP2 || '-'}</td>
              <td className="p-2 text-center border border-gray-100 font-bold">{item.MFT2 || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.MT2_TURMA || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.FT2 || '-'}</td>
              <td className="p-2 text-center border border-gray-100">{item.T3 || '-'}</td>
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
    )}
       </Section>
   </MainLayout>
  );
});