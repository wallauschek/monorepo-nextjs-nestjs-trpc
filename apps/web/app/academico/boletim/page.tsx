'use client';

import ChamadasBackEnd from "@web/apis/ChamadasBackEnd";
import Button from "@web/app/components/atoms/Button/Button";
import LoadPage from "@web/app/components/molecules/LoadPage/LoadPage";
import SelectStudents from "@web/app/components/molecules/SelectStudents/SelectStudents";
import BoletimCEL1A1 from "@web/app/components/organisms/Boletins/BoletimCEL1A1/BoletimCEL1A1";
import BoletimCEL3S2 from "@web/app/components/organisms/Boletins/BoletimCEL3S2/BoletimCEL3S2";
import BoletimCELEFAF from "@web/app/components/organisms/Boletins/BoletimCELEFAF/BoletimCELEFAF";
import BoletimCELEFAI from "@web/app/components/organisms/Boletins/BoletimCELEFAI/BoletimCELEFAI";
import BoletimCELEM from "@web/app/components/organisms/Boletins/BoletimCELEM/BoletimCELEM";
import BoletimFranco3S2 from "@web/app/components/organisms/Boletins/BoletimFranco3S2/BoletimFranco3S2";
import BoletimFrancoEFAFEM from "@web/app/components/organisms/Boletins/BoletimFrancoEFAFEM/BoletimFrancoEFAFEM";
import BoletimFrancoEFAI from "@web/app/components/organisms/Boletins/BoletimFrancoEFAI/BoletimFrancoEFAI";
import Section from "@web/app/components/organisms/Section/Section";
import { MainLayout } from "@web/app/components/templates/MainLayout";
import appStore from "@web/stores/app";
import aos from "aos";
import Aos from "aos";
import { PenSquare } from "lucide-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";



export default observer(function BoletimBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const { 
    school, 
    setSchool, 
    getStudents,
    students,
    studentSelected: studentSelectedStore,
    setStudentSelected: setStudentSelectedStore 
  } = appStore;
  const [dados, setDados] = useState<any>([]);
  const [studentSelected, setStudentSelected] = useState(studentSelectedStore);

  console.log(dados);

  useEffect(() => {
    Aos.init({ duration: 1500 });
    const school = process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? 'franco' : 'cel';

    document.querySelector('html')?.setAttribute('data-theme', school);
    setSchool(school);
    getStudents();

    setIsLoading(false);
    
  }, []);

  // useEffect(() => {
    
  //   studentSelected &&
  //   ChamadasBackEnd.buscaNotasBoletim(
  //     studentSelected.codColigada,
  //     studentSelected.periodoLetivo,
  //     studentSelected.registroAcademicoBasico
  //   ).then(
  //     (res) => {
  //       setDados(res);
  //       setIsLoading(false);
  //     }
  //   )
  // }, [studentSelected]);

  if (isLoading) return <LoadPage />;
  
  return (
    <MainLayout className="relative h-screen space-y-10">
      <SelectStudents setStudentSelected={setStudentSelected} studentSelected={studentSelected} />

      <Section
        data-aos="fade-up"
        className="grid w-full text-primary"
      >
        <div className="border-b text-primary">
          <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <a href="/" className=" inline-flex items-center text-sm text-card">
                        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                            </path>
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <a href="/academico" className=" ml-1 md:ml-2 text-sm text-card">Acadêmico</a>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span className=" ml-1 md:ml-2 text-sm font-medium" aria-current="page">Boletim</span>
                    </div>
                </li>
            </ol>
          </nav>
        <div className="flex justify-between items-center">
  <h1 className="mt-2 text-2xl font-bold leading-7sm:truncate sm:text-3xl sm:tracking-tight">BOLETIM ESCOLAR</h1>
  {studentSelected && students.length > 1 && (
    <Button
      variant="destructive"
      onClick={() => setStudentSelected(null)}
      className="hover:"
    >
      <div className="flex items-center text-primary">
        <PenSquare className="max-md:w-4 mr-2" />
        <span>Alterar Aluno</span>
      </div>
    </Button>
  )}
</div>
          </div>
    {
      studentSelected && (

          ['1A1', '2A1', '3A1', '4A1', '5A1'].includes(studentSelected.codSerie) && 
            studentSelected.codColigada === 5 ? (
            <BoletimFrancoEFAI />
          ) : ['6A1', '7A1', '8A1', '9A1', '1S2', '2S2'].includes(studentSelected.codSerie)  && 
            studentSelected.codColigada === 5 ? (
            <BoletimFrancoEFAFEM />
          ) : ['3S2'].includes(studentSelected.codSerie)  && 
            studentSelected.codColigada === 5 ? (
            <BoletimFranco3S2 />
          ): ['1A1'].includes(studentSelected.codSerie)  && 
          studentSelected.codColigada === 1 ? (
            <BoletimCEL1A1 />
          ) : ['2A1', '3A1', '4A1', '5A1'].includes(studentSelected.codSerie)  && 
          studentSelected.codColigada === 1 ? (
            <BoletimCELEFAI />
          ) : ['6A1', '7A1', '8A1', '9A1'].includes(studentSelected.codSerie)  && 
          studentSelected.codColigada === 1 ? (
            <BoletimCELEFAF />
          ) : ['1S2', '2S2'].includes(studentSelected.codSerie)  && 
          studentSelected.codColigada === 1 ? (
            <BoletimCELEM />
          ) : ['3S2'].includes(studentSelected.codSerie)  && 
          studentSelected.codColigada === 1 ? (
            <BoletimCEL3S2 />
          ) : <div className="flex justify-center items-center h-64">
            <p>Este aluno não possui boletim para exibição</p>
          </div>
        
      )
    }
    
       </Section>
   </MainLayout>
  );
});