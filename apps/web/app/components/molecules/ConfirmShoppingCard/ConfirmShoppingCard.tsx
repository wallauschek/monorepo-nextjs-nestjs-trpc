import { BookOpenText, CheckCircle2, FileText, Frown, Loader2Icon, X, XCircle } from 'lucide-react';
import { Dispatch, useState } from 'react';
import ChamadasBackEnd from 'src/apis/ChamadasBackEnd';

import Button from '@web/app/components/atoms/Button/Button';
import { useToast } from '@web/app/components/ui/use-toast';

import Link from '@web/app/components/atoms/Link/Link';
import coursesStore from '../../../stores/cursos';

export interface IConfirmShoppingCard {
  title?: string;
  items: any[];
  expired: string[];
  closeFunction: () => void;
  setCoursesSelected: Dispatch<any>;
  setItemsExpired: Dispatch<string[]>;
  urlBoleto: string;
}

const ConfirmShoppingCard: React.FC<IConfirmShoppingCard> = ({
  items,
  closeFunction,
  expired,
  setCoursesSelected,
  setItemsExpired,
  urlBoleto
}) => {
  const { setShoppingCart, shoppingCart, courses } = coursesStore;
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boletos, setBoletos] = useState<any>([]);
  const [step, setStep] = useState('resumo');
  const { toast } = useToast();

  async function finalizarCompra() {
    setSubmitting(true);
    if (expired.length > 0) {
      setSubmitting(false);

      return setStep('item_expirado');
    }

    const idItensCarrinho = items.map((item: any) => item.id);

    return items.length === 1
      ? await ChamadasBackEnd.setMatricula(items[0].id)
          .then((res) => {
            const { data } = res;
            if (res.status !== 201) throw new Error();
            const refactorSC = shoppingCart.map((item: any) => {
              if (item.id === items[0].id) {
                item.status = 'confirmado';
              }

              return item;
            });

            const course = courses.find(
              (item) =>
                item.cdfilial === data.dadosCurso[0].codFilial &&
                item.codTurma === data.dadosCurso[0].codTurma
            );
            setBoletos((prevState: any) => [
              ...prevState,
              {
                url: data.dadosCurso[0].boletos[0].urlBoleto,
                name: course?.nomeCursoReduzido,
                studentName: data.dadosCurso[0].aluno.aluno
              }
            ]);

            setShoppingCart(refactorSC);
            setCoursesSelected([]);
            setSubmitting(false);
            setStep('compra_efetuada');

            return toast({
              title: 'Compra Efetuada!',
              description: 'Sua compra foi efetuada com sucesso.',
              variant: 'success'
            });
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
            setStep('erro');

            return toast({
              title: 'Falha!',
              description: 'Aconteceu um erro ao precessar sua compra.'
            });
          })
      : await ChamadasBackEnd.setMultMatricula(idItensCarrinho)
          .then((res) => {
            if (res.status !== 201) throw new Error();
            const refactorSC = shoppingCart.map((item: any) => {
              if (idItensCarrinho.includes(item.id)) {
                item.status = 'confirmado';
              }

              return item;
            });
            for (const data of res.data) {
              const course = courses.find(
                (item) =>
                  item.cdfilial === data.dadosCurso[0].codFilial &&
                  item.codTurma === data.dadosCurso[0].codTurma
              );
              setBoletos((prevState: any) => [
                ...prevState,
                {
                  url: data.dadosCurso[0].boletos[0].urlBoleto,
                  name: course?.nomeCursoReduzido,
                  studentName: data.dadosCurso[0].aluno.aluno
                }
              ]);
            }
            setShoppingCart(refactorSC);
            setCoursesSelected([]);
            setSubmitting(false);
            setStep('compra_efetuada');

            return toast({
              title: 'Compra Efetuada!',
              description: 'Sua compra foi efetuada com sucesso.',
              variant: 'success'
            });
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
            setStep('erro');

            return toast({
              title: 'Falha!',
              description: 'Aconteceu um erro ao precessar sua compra.'
            });
          });
  }

  const handleContract = async (urlBoleto: string) => {
    // e.preventDefault();
    setIsLoading(true);

    try {
      // Abrir a URL em uma nova guia
      window.open(urlBoleto, '_blank');

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar o boleto:', error);
    }
  };

  const handleBoletoClick = async (e: any, urlBoleto: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(urlBoleto);
      const data = await response.json();

      // Criar um Blob a partir do base64
      const pdfBlob = new Blob([Buffer.from(data, 'base64')], { type: 'application/pdf' });

      // Criar uma URL de objeto Blob
      const blobURL = URL.createObjectURL(pdfBlob);

      // Abrir a URL em uma nova guia
      window.open(blobURL, '_blank');

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar o boleto:', error);
    }
  };

  return (
    <div
      onClick={() => {
        if (step === 'item_expirado' && expired.length > 0) {
          setCoursesSelected((prevState: any) => {
            // Filtra os items expirados
            const updatedItems = prevState.filter((item: any) => !expired.includes(item.id));

            return updatedItems;
          });
          setItemsExpired([]);
        }
        !submitting && closeFunction();
      }}
      className="fixed left-0 right-0 top-0 z-[999] flex h-full w-full items-center justify-center rounded-md bg-black/50 shadow-lg"
    >
      <div
        className=" relative  grid w-96 gap-4 bg-red-50  p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="absolute right-1 top-1 cursor-pointer text-gray-300 duration-300 hover:text-gray-400"
          onClick={() => {
            if (step === 'item_expirado' && expired.length > 0) {
              setCoursesSelected((prevState: any) => {
                // Filtra os items expirados
                const updatedItems = prevState.filter((item: any) => !expired.includes(item.id));

                return updatedItems;
              });
              setItemsExpired([]);
            }

            !submitting && closeFunction();
          }}
        />
        {(() => {
          switch (step) {
            case 'resumo':
              return (
                <>
                  <h2 className="text-center text-2xl font-bold text-gray-600">Resumo da compra</h2>
                  <div className="grid max-h-[200px] gap-2 overflow-y-auto">
                    {items.map((item: any, index: number) => {
                      return (
                        <div className="grid grid-cols-[max-content_1fr] gap-1" key={index}>
                          {item.course.images === '' ? (
                            <span className=" row-span-2 mr-1 flex h-12 w-12 items-center justify-center self-center border border-primary bg-primary text-white duration-300 group-hover:bg-white group-hover:text-primary group-active:bg-white  group-active:text-primary">
                              <BookOpenText />
                            </span>
                          ) : (
                            <img
                              src={item.course.images.sm}
                              alt=""
                              className="row-span-2 mr-1  w-12"
                              width={20}
                              height={20}
                            />
                          )}
                          <span className="font-bold">{item.course.nomeCursoReduzido}</span>
                          <span className="    text-sm text-gray-400">
                            {' '}
                            {item.student.aluno.split(' ')[0]}{' '}
                            {item.student.aluno.split(' ')[1] && item.student.aluno.split(' ')[1]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep('contrato');
                    }}
                  >
                    Finalizar
                  </Button>
                </>
              );

            case 'contrato':
              return (
                <>
                  <h2 className="text-center text-2xl font-bold text-gray-600">Contrato</h2>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContract(urlBoleto);
                    }}
                  >
                    baixar o contrato para prosseguir
                  </Button>

                  <Button
                    disabled={isLoading || submitting}
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      finalizarCompra();
                    }}
                  >
                    {submitting ? <Loader2Icon className="mx-auto animate-spin" /> : 'Concordo'}
                  </Button>
                </>
              );

            case 'compra_efetuada':
              return (
                <>
                  <h2 className="flex items-center justify-center gap-1 text-center text-2xl font-bold text-green-400">
                    <CheckCircle2 />
                    Compra Efetuada
                  </h2>
                  <div className="">
                    Parabéns! Sua compra foi concluída com sucesso. Seus boletos também podem ser
                    acessados em{' '}
                    <a
                      href="/painel/meus-cursos"
                      className="font-bold text-gray-500 duration-300 hover:text-gray-950  hover:underline-offset-1"
                    >
                      Meus Cursos.
                    </a>
                    {boletos.length > 0 && <h3 className="my-2 font-semibold">Boletos:</h3>}
                    {boletos.length > 0 && (
                      <div className="flex max-h-[200px] flex-col gap-3 overflow-y-auto">
                        {boletos.map((boleto: any, index: number) => {
                          return (
                            <div key={index}>
                              <Button
                                disabled={isLoading}
                                variant="destructive"
                                onClick={(e) => handleBoletoClick(e, boleto.url)}
                                className="flex w-full cursor-pointer items-center gap-1.5 p-3 text-center text-gray-950 duration-300 hover:bg-gray-100 hover:no-underline disabled:animate-pulse disabled:hover:bg-gray-100 disabled:hover:text-gray-950 max-md:text-sm"
                                rel="noreferrer"
                              >
                                <FileText size={16} />

                                {isLoading ? (
                                  <span className="mx-auto text-sm">Carregando boleto...</span>
                                ) : (
                                  <span className="text-sm">
                                    {boleto.name} {`(${boleto.studentName})`}
                                  </span>
                                )}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <Link href="/painel/meus-cursos" className="p-3 text-center" variant="primary">
                    Acessar meus cursos
                  </Link>
                </>
              );

            case 'erro':
              return (
                <>
                  <h2 className="flex items-center justify-center gap-1 text-center text-2xl font-bold text-red-400">
                    <XCircle />
                    Falha
                  </h2>
                  <div className="">Ops! Algo deu errado ao processar sua compra.</div>
                  <Button
                    variant="primary"
                    disabled={submitting}
                    onClick={(e) => {
                      e.stopPropagation();
                      finalizarCompra();
                    }}
                  >
                    {submitting ? (
                      <Loader2Icon className="mx-auto animate-spin" />
                    ) : (
                      'Tentar Novamente'
                    )}
                  </Button>
                </>
              );

            case 'item_expirado':
              return (
                <>
                  <h2 className="flex items-center justify-center gap-1 text-center text-2xl font-bold text-red-400">
                    <Frown />
                    Curso Expirado
                  </h2>
                  <div className="">
                    Um ou mais cursos que você tinha no carrinho expiraram. Por favor, reveja sua
                    seleção antes de continuar.
                  </div>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (expired.length > 0) {
                        setCoursesSelected((prevState: any) => {
                          // Filtra os items expirados

                          const updatedItems = prevState.filter(
                            (item: any) => !expired.includes(item.id)
                          );

                          return updatedItems;
                        });
                        setItemsExpired([]);

                        return closeFunction();
                      }

                      return closeFunction();
                    }}
                  >
                    Fechar
                  </Button>
                </>
              );

            default:
              return <p></p>;
          }
        })()}
      </div>
    </div>
  );
};

export default ConfirmShoppingCard;

// <div className="grid w-96 gap-3 bg-red-50 p-5">
//
//       </div>
