'use client';
import { Loader2Icon, Undo2 } from 'lucide-react';
import { observer } from 'mobx-react';
import Image from 'next/image';
import logoCel from '@web/public/logo_cel.svg';
import logoFranco from '@web/public/logo_franco.svg';
import { FormEvent, useEffect, useState } from 'react';

import Button from '@web/app/components/atoms/Button/Button';
import Input from '@web/app/components/atoms/Input/Input';
import FormContent from '@web/app/components/molecules/FormContent/FormContent';
import FormHeader from '@web/app/components/molecules/FormHeader/FormHeader';
import LoadPage from '@web/app/components/molecules/LoadPage/LoadPage';
import FormRoot from '@web/app/components/organisms/FormRoot/FormRoot';
import { useToast } from '@web/app/components/ui/use-toast';

import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import appStore from '@web/stores/app';
export default observer(function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { setSchool, school } = appStore;
  const { toast } = useToast();
  const [submitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  useEffect(() => {
    const school = process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? 'franco' : 'cel';

    document.querySelector('html')?.setAttribute('data-theme', school);
    setSchool(school);
    setIsLoading(false);
  }, []);

  async function onSubmitFunction(event: FormEvent<HTMLFormElement>) {
    setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const usuario = formData.get('user');
    const email = formData.get('email');
    const emailRegex = /^[a-zA-Z0-9]{2,}@[a-zA-Z0-9]{2,}$/;
    if (canSubmit) {
      if (
        !usuario ||
        !email ||
        usuario.toString().length < 11 ||
        emailRegex.test(email.toString())
      ) {
        setIsSubmitting(false);

        return toast({
          title: 'Credenciais Inválidas!',
          description: 'Verifique as informações digitadas.'
        });
      }

      return await ChamadasBackEnd.recuperarSenha({
        usuario,
        email,
        coligada: school === 'cel' ? 1 : 5
      })
        .then((res) => {

        console.log("🚀 ~ .then ~ res:", res)

          if (!res) throw new Error();
          setIsSubmitting(false);

          setCanSubmit(false);
          setTimeout(() => {
            setCanSubmit(true);
          }, 30000);

          return toast({
            title: 'Email enviado!',
            variant: 'success',
            description: 'Verifique seu email para recuperar sua senha.'
          });
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);

          return toast({
            title: 'Ops!',
            description: 'Erro ao solicitar recuperção de senha.'
          });
        });
    } else {
      setIsSubmitting(false);

      return toast({
        title: 'Atenção!',
        description: 'Aguarde antes de enviar outra solicitação.'
      });
    }
  }
  if (isLoading) return <LoadPage />;

  return (
    <main className="flex h-screen items-center justify-center ">
      <FormRoot
        onSubmitFunction={onSubmitFunction}
        className=" relative  w-full space-y-5 p-5 md:w-[50%]"
      >
        <span className="absolute -bottom-3 right-0  h-[3px] w-[100px] bg-primary transition-all duration-300   hover:bg-gray-50  "></span>
        <span className=" absolute left-0 top-0  h-[3px] w-[100px] bg-secondary transition-all duration-300   hover:bg-gray-50  "></span>

        <FormHeader className={`${school === 'franco' ? 'space-y-6' : 'space-y-10'} `}>
          <Undo2
            onClick={() => window.history.back()}
            className="absolute w-4 text-gray-400 duration-300  hover:text-gray-600 active:text-gray-600  md:left-0 md:w-6"
          />

          <Image
            src={school === 'franco' ? logoFranco : logoCel}
            alt="logo Escola"
            className={`mx-auto md:mx-0 md:ml-3  ${
              school === 'franco' ? 'w-28 md:w-52' : 'w-20 md:w-40'
            }`}
          />
          <h1 className="font-secondary text-xl text-gray-400 md:text-4xl">Esqueceu sua senha?</h1>
          <p className="text-gray-300 ">
            Você receberá um e-mail com um link para redefinir sua senha.
          </p>
        </FormHeader>
        <FormContent className="flex flex-col items-center space-y-8">
          <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
            <label htmlFor="user" className=" text-sm text-gray-400 md:text-base">
              Usuário
            </label>
            <Input type="text" name="user" placeholder="Digite seu usuário" />
          </div>
          <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
            <label htmlFor="email" className=" text-sm text-gray-400 md:text-base">
              Email
            </label>
            <Input type="email" name="email" placeholder="Digite seu email" />
          </div>
          <Button disabled={submitting} variant="primary" className=" mt-4 w-3/4 ">
            {submitting ? <Loader2Icon className="mx-auto animate-spin" /> : 'Enviar'}
          </Button>
        </FormContent>
      </FormRoot>
    </main>
  );
});
