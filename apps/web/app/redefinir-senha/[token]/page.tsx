'use client';
import { Loader2Icon, Undo2 } from 'lucide-react';
import Image from 'next/image';
import logoCel from '@web/public/logo_cel.svg';
import logoFranco from '@web/public/logo_franco.svg';
import { FormEvent, useEffect, useState } from 'react';

import Button from '@web/app/components/atoms/Button/Button';
import Input from '@web/app/components/atoms/Input/Input';
import PasswordVisibilityToggle from '@web/app/components/atoms/PasswordVisibilityToggle/PasswordVisibilityToggle';
import FormContent from '@web/app/components/molecules/FormContent/FormContent';
import FormHeader from '@web/app/components/molecules/FormHeader/FormHeader';
import LoadPage from '@web/app/components/molecules/LoadPage/LoadPage';
import FormRoot from '@web/app/components/organisms/FormRoot/FormRoot';
import { useToast } from '@web/app/components/ui/use-toast';

import { useRouter } from 'next/navigation';
import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import appStore from '@web/stores/app';
export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setSchool, school } = appStore;
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

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
    const password = formData.get('new_password');
    const confirm_password = formData.get('confirm_new_password');

    if (password && confirm_password) {
      if (password?.toString().length >= 6)
        if (password === confirm_password) {
          return await ChamadasBackEnd.salvarNovaSenha({
            token: params.token,
            senha: password
          })
            .then((response) => {
              console.log(response);
              if (!response) throw new Error();

              toast({
                title: 'Senha atualizada!',
                description: 'Sua senha foi atualizada com sucesso.',
                variant: 'success'
              });

              return router.push('/login');
            })
            .catch((err) => {
              console.log(err);
              setIsSubmitting(false);

              return toast({
                title: 'Ops!',
                description: 'Falha ao tentar atualizar sua senha. Por favor, tente novamente.'
              });
            });
        } else {
          setIsSubmitting(false);

          return toast({
            title: 'Ops!',
            description: 'As senhas digitadas não coincidem. Por favor, tente novamente.'
          });
        }
      else {
        setIsSubmitting(false);

        return toast({
          title: 'Ops!',
          description: 'Sua senha precisa ter no mínimo 6 caracteres.'
        });
      }
    } else {
      setIsSubmitting(false);

      return toast({
        title: 'Credenciais Inválidas!',
        description: 'Verifique as informações digitadas.'
      });
    }
  }

  if (isLoading) return <LoadPage />;

  return (
    <main className="flex h-screen items-center justify-center ">
      <FormRoot
        onSubmitFunction={onSubmitFunction}
        className="  relative w-full space-y-5  p-5 md:w-[50%]"
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
          <h1 className="font-secondary text-xl text-gray-400 md:text-4xl">Redefina sua senha</h1>
          <p className="text-gray-300 ">Defina uma nova senha para acessar sua conta.</p>
        </FormHeader>
        <FormContent className="flex flex-col items-center space-y-8">
          <div className="  flex w-[90%] max-w-sm flex-col gap-1.5">
            <label htmlFor="new_password" className=" text-sm text-gray-400 md:text-base">
              Senha
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="new_password"
                className="   pr-8"
                placeholder="Digite sua senha"
              />
              <PasswordVisibilityToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>
          <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
            <label htmlFor="confirm_new_password" className=" text-sm text-gray-400 md:text-base">
              Confirme sua senha
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_new_password"
                placeholder="confirme sua senha"
              />
              <PasswordVisibilityToggle
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
            </div>
          </div>
          <Button disabled={submitting} variant="primary" className=" mt-4 w-3/4 ">
            {submitting ? <Loader2Icon className="mx-auto animate-spin" /> : 'Confirmar'}
          </Button>
        </FormContent>
      </FormRoot>
    </main>
  );
}
