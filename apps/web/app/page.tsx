'use client';

import AOS from 'aos';
import { Award, BookOpen, Heart, Users2 } from 'lucide-react';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import LoadPage from '@web/app/components/molecules/LoadPage/LoadPage';
import Section from '@web/app/components/organisms/Section/Section';
import { MainLayout } from '@web/app/components/templates/MainLayout';

import appStore from '@web/stores/app';
import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
const vantagens = [
  {
    title: 'Melhora no Desempenho Escolar',
    content: 'Cursos extras ajudam os alunos a obter melhores notas e desempenho acadêmico.',
    icon: BookOpen
  },
  {
    title: 'Desenvolvimento Socioemocional',
    content:
      'Além do aprendizado, os cursos extras estimulam o desenvolvimento de habilidades importantes, como socialização e concentração.',
    icon: Users2
  },
  {
    title: 'Enriquecimento Curricular',
    content: 'Oferecem uma formação mais completa, abrangendo conteúdos além da sala de aula.',
    icon: Award
  },
  {
    title: 'Oportunidades de Crescimento',
    content:
      'Permitem que os alunos explorem interesses e paixões, aumentando suas oportunidades de crescimento e aprendizado.',
    icon: Heart
  }
];

export default observer(function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { school, setSchool } = appStore;
  const [dados, setDados] = useState<any>();

  useEffect(() => {
    AOS.init({ duration: 1500 });
    const school = process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? 'franco' : 'cel';

    document.querySelector('html')?.setAttribute('data-theme', school);
    setSchool(school);
    ChamadasBackEnd.getUser().then(
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
        className="grid w-full   grid-rows-[min-content_1fr] gap-5 overflow-hidden max-md:space-y-10 md:grid-cols-[400px_1fr] md:grid-rows-1 lg:grid-cols-[600px_1fr] "
      >
        <div className="group flex flex-col space-y-5 ">
          <span className=" top-50 left-50  h-[3px] w-[70px]   bg-secondary duration-300 group-hover:w-[100px]  group-hover:bg-primary"></span>

          <h1 className=" font-secondary text-3xl font-bold text-primary md:text-7xl">
            Portal do Aluno e Responsável do {" "}
            {process.env.NEXT_PUBLIC_DOMAIN === window.location.host
              ? 'Colégio Franco'
              : 'CEL Intercultural School'}
          </h1>
          <div>
            {
              dados?.name && (
                <p className="text-gray-400">
                  Bem-vindo, <span className="font-bold">{dados?.name}</span>!
                </p>
              )
            }
          </div>
        </div>
        {/* <div className=" flex  items-center justify-center bg-gray-200  text-2xl ">IMAGE</div> */}

        
      </Section>
    </MainLayout>
  );
});
