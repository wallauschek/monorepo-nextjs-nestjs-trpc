import Button from '@web/app/components/atoms/Button/Button';
import { useToast } from '@web/app/components/ui/use-toast';
import { X } from 'lucide-react';
import { Dispatch } from 'react';
import ChamadasBackEnd from 'src/apis/ChamadasBackEnd';
import { Course } from 'src/interfaces/Cursos';
import coursesStore from '../../../stores/cursos';

export interface IDeleteConfirm {
  setSubmittingItem: Dispatch<boolean> | any;
  submittingItem: boolean;
  closeModal: () => void;
  studentSelected: any;
  course: any;
}

const DeleteConfirm: React.FC<IDeleteConfirm> = ({
  closeModal,
  setSubmittingItem,
  submittingItem,
  studentSelected,
  course
}) => {
  const { setCourses, shoppingCart, courses, deleteItemShoppingCart } = coursesStore;
  const { toast } = useToast();

  return (
    <div
      onClick={() => !submittingItem && closeModal()}
      className="fixed left-0 right-0 top-0 z-[999] flex h-full w-full items-center justify-center rounded-md bg-black/50 shadow-lg"
    >
      <div className="relative grid w-96 gap-3 bg-red-50 p-5">
        <X
          className="absolute right-1 top-1 cursor-pointer text-gray-300 duration-300 hover:text-gray-400"
          onClick={() => !submittingItem && closeModal()}
        />
        <h2 className="text-center text-2xl font-bold text-gray-600 max-md:text-xl">
          Tem certeza que deseja deletar esse item?
        </h2>
        <p>
          Você está prestes a deletar o curso{' '}
          <span className="font-bold">
            {course.nomeCurso} - {course.nomeTurma}
          </span>{' '}
          do seu carrinho.
        </p>
        <p>
          {/* Você perderá a exclusividade desse curso para a fila de espera. */}
          {course.QtdVagas <= 0 &&
            'Você perderá a exclusividade dessa atividade para a fila de espera existente.'}
        </p>
        <div className="flex w-full justify-center gap-2">
          <Button
            onClick={() => !submittingItem && closeModal()}
            variant="primary"
            disabled={submittingItem}
            className="w-full"
          >
            Não
          </Button>
          <Button
            className="w-full"
            onClick={async (e) => {
              e.stopPropagation();

              setSubmittingItem(true);
              const cursoIdSC = shoppingCart.find((item: any) => {
                if (item.codTurma === course.codTurma) {
                  if (
                    (studentSelected?.registroAcademicoExtra &&
                      studentSelected.registroAcademicoExtra === item.registroAcademicoExtra) ||
                    (studentSelected?.codPessoa && studentSelected.codPessoa === item.codPessoa) ||
                    (studentSelected?.registroAcademicoBasico &&
                      studentSelected.registroAcademicoBasico === item.registroAcademicoBasico) ||
                    (studentSelected?.idAluno && studentSelected.idAluno === item.idAluno)
                  )
                    return item;
                }

                return false;
              });

              return await ChamadasBackEnd.deleteItemShoppingCart(cursoIdSC.id)
                .then(() => {
                  deleteItemShoppingCart(cursoIdSC.id);
                  if (cursoIdSC.status === 'aberto') {
                    const newArray = courses.map((item: Course) => {
                      if (item.codTurma === cursoIdSC.codTurma) {
                        const novaQtdVagas = item.QtdVagas + 1;

                        if (novaQtdVagas !== 0) {
                          item.status = 'Disponível';
                        }

                        return {
                          ...item,
                          QtdCarrinho: item.QtdCarrinho - 1,
                          QtdVagas: novaQtdVagas
                        };
                      }

                      return item;
                    });

                    setCourses(newArray);
                  }
                  setSubmittingItem(false);
                  closeModal();

                  return toast({
                    title: 'Curso deletado!',
                    description: `Seu curso foi deletado ${
                      cursoIdSC.status === 'aberto' ? 'do carrinho' : 'da fila de espera'
                    }.`,
                    variant: 'success'
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setSubmittingItem(false);

                  return toast({
                    title: 'Erro!',
                    description: 'Erro ao deletar seu curso.'
                  });
                });
            }}
            disabled={submittingItem}
          >
            Sim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
