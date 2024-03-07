import { Loader2 } from 'lucide-react';
import { observer } from 'mobx-react';
import { Dispatch } from 'react';

import Link from '@web/app/components/atoms/Link/Link';

import coursesStore from '../../../stores/cursos';

export interface ISelectStudents {
  title?: string;
  studentSelected: any;
  setStudentSelected: Dispatch<any>;
}

const SelectStudents: React.FC<ISelectStudents> = observer(
  //iniciar router para chamar a pagina de cursos

  ({ studentSelected, setStudentSelected }) => {
    const {
      loadingStudents,
      students,
      setStudentSelected: setStudentSelectedStore,
      school
    } = coursesStore;

    if (!studentSelected) {
      if (students.length === 0) {
        return (
          <div className="fixed left-0 right-0 top-0 z-[999] flex h-full w-full items-center justify-center rounded-md bg-black/50 shadow-lg">
            <div className="grid w-96 gap-3 bg-red-50 p-5 text-center">
              <h1>Nenhum aluno ativo em 2024</h1>
              <p className="text-sm">
                Não foi identificado nenhum aluno ativo no ensino básico vinculado à sua conta. Por
                favor, entre em contato com a secretaria da escola.
              </p>
              <Link
                className={` ${
                  school === 'cel' ? 'border-[#74b956] bg-[#74b956] hover:text-[#74b956]' : ''
                } self-end text-center `}
                variant="primary"
                size="default"
                href="/"
              >
                voltar
              </Link>
            </div>
          </div>
        );
      }

      return (
        <div className="fixed left-0 right-0 top-0 z-[999] flex h-full w-full items-center justify-center rounded-md bg-black/50 shadow-lg">
          <div className="grid w-96 gap-3 bg-red-50 p-5">
            <h2 className="text-center text-2xl font-bold text-gray-600 max-md:text-xl">
              Selecione um Aluno
            </h2>
            {loadingStudents === 'success' ? (
              students.map((student: any, index: number) => {
                return (
                  <span
                    key={index}
                    onClick={() => setStudentSelected(setStudentSelectedStore(student))}
                    className="flex cursor-pointer items-center gap-2 p-3 text-gray-950 duration-300 hover:bg-gray-100 max-md:text-sm"
                  >
                    <span
                      // onClick={() => setIsMenuOpen(setProfileDesktop())}
                      className=" w-10 cursor-default rounded-full  bg-primary p-2 text-center text-white duration-300 hover:text-gray-100 "
                    >
                      {`${student.aluno.split(' ')[0][0]}`}
                    </span>
                    {student.aluno}
                  </span>
                );
              })
            ) : (
              <span className="flex h-min w-full animate-pulse items-center justify-center gap-1 self-center p-5 font-secondary font-semibold text-gray-300">
                <Loader2 className="animate-spin" size={16} /> Carregando alunos...
              </span>
            )}
          </div>
        </div>
      );
    }
  }
);

export default SelectStudents;
