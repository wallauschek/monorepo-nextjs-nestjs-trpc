'use client';

import * as cookie from 'cookies-next';
import jwt from 'jsonwebtoken';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logoCel from '@web/public/logo_cel.svg';
import logoFranco from '@web/public/logo_franco.svg';
import { FormEvent, useEffect, useState } from 'react';

import Button from '@web/app/components/atoms/Button/Button';
import Input from '@web/app/components/atoms/Input/Input';
import Link from '@web/app/components/atoms/Link/Link';
import PasswordVisibilityToggle from '@web/app/components/atoms/PasswordVisibilityToggle/PasswordVisibilityToggle';
import FormContent from '@web/app/components/molecules/FormContent/FormContent';
import LoadPage from '@web/app/components/molecules/LoadPage/LoadPage';
import FormRoot from '@web/app/components/organisms/FormRoot/FormRoot';
import { useToast } from '@web/app/components/ui/use-toast';

import { trpc } from '../trpc';
import appStore from '@web/stores/app';
// import { headers } from 'next/headers';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { clearAll, school, setSchool } = appStore;

  useEffect(() => {
    clearAll();
    setSchool(process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? 'franco' : 'cel');

    document.querySelector('html')?.setAttribute('data-theme', school);

    setIsLoading(false);
  }, [school]);

  if (isLoading) return <LoadPage />;

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get('user');
    const password = formData.get('password');

    if (
      !usuario || 
      !password || 
      (usuario.toString().length !== 10 && usuario.toString().length !== 11)
    ) {
      setIsSubmitting(false);

      return toast({
        title: 'Credenciais Inválidas!',
        description: 'Verifique as informações digitadas.'
      });
    }

    return trpc.signInLocal.query({ 
      username: usuario.toString(),
      password: password.toString()
     }).then(async (res: any) => {

        console.log("🚀 ~ signIn ~ res:", res)

        const { access_token, refresh_token } = res;
        const decode_access_token: any = jwt.decode(access_token);
        const decode_refresh_token: any = jwt.decode(refresh_token);

        cookie.setCookie('access_token', access_token, {
          expires: new Date(decode_access_token.exp * 1000)
        });
        cookie.setCookie('refresh_token', refresh_token, {
          expires: new Date(decode_refresh_token.exp * 1000)
        });

        toast({
          title: 'Usuário logado!',
          description: 'Login feito com sucesso.',
          variant: 'success'
        });

        const redirectTo = cookie.getCookie('redirectTo');

        return redirectTo ? router.push(redirectTo) : router.push('/');
      })
      .catch((err: any) => {
        console.log(err);
        setIsSubmitting(false);

        return toast({
          title: 'Credenciais Inválidas!',
          description: 'Verifique as informações digitadas.',
          duration: 3000
        });
      });
  }

  return (
    <main className="grid  h-screen grid-cols-1  grid-rows-[min-content_1fr] space-y-5 bg-white md:grid-cols-2   md:grid-rows-none md:items-center md:gap-8  ">
      <div className=" w-full md:order-last">
        <div className={`mt-8 ${school === 'franco' ? 'space-y-6' : 'space-y-10'}  p-3 md:mt-0`}>
          <Image
            src={school === 'franco' ? logoFranco : logoCel}
            alt="logo Escola"
            className={`mx-auto md:mx-0  ${school === 'franco' ? 'w-28 md:w-52' : 'w-20 md:w-40'}`}
          />
          <h2 className="font-secondary text-xl text-gray-400 md:text-5xl">
            Bem-vindo ao Portal do Aluno e Responsável do{' '}
            <span className=" font-bold">
              {process.env.NEXT_PUBLIC_DOMAIN === window.location.host
                ? 'Colégio Franco'
                : 'CEL Intercultural School'}
            </span>
          </h2>
          <p className="text-gray-300 max-md:hidden">
            Por favor, faça o login para explorar os cursos e recursos disponíveis.
          </p>
          <span className="absolute bottom-36 right-5 h-[3px] w-[100px] bg-primary transition-all duration-300   hover:bg-gray-50  "></span>
          <span className=" absolute h-[3px] w-[100px] bg-secondary  transition-all duration-300 hover:bg-gray-50 max-md:top-0 md:top-28   lg:top-36  "></span>
        </div>
      </div>
      <FormRoot
        onSubmitFunction={signIn}
        className="flex flex-col p-5 md:w-[70%]  md:flex-col md:space-y-5 md:justify-self-center md:rounded-sm md:border  md:border-gray-200  md:pt-6 md:shadow"
      >
        <FormContent className="flex flex-col items-center space-y-10 ">
          <div className=" flex w-full flex-col items-center space-y-5">
            <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
              <label htmlFor="user" className=" text-sm text-gray-400 md:text-base">
                Usuário
              </label>
              <Input type="text" name="user" placeholder="Digite seu usuário" />
            </div>
            <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
              <label htmlFor="senha" className=" text-sm text-gray-400 md:text-base">
                Senha
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Digite sua senha"
                />
                <PasswordVisibilityToggle
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
              <Link
                href="/esqueceu-senha"
                className="ml-auto text-sm text-gray-950 duration-300 hover:text-primary hover:no-underline md:text-base"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col items-center space-y-3 ">
            <Button disabled={submitting} variant="primary" className=" mt-4 w-3/4 ">
              {submitting ? <Loader2Icon className="mx-auto animate-spin" /> : 'Entrar'}
            </Button>
            {/* <span>ou</span>

            <Link
              href=""
              className="flex h-min  w-3/4 items-center justify-center space-x-1 pr-2 text-gray-950    hover:no-underline   "
            >
              <Image
                className=" mr-2 h-8 w-8"
                src={googleIcon}
                width={4}
                height={4}
                alt="Ícone Google"
              />
              Entrar com Google
            </Link> */}
          </div>
        </FormContent>
        {/* <FormFooter className="mt-auto py-3 text-center md:mt-0">
          <span className="  text-sm text-gray-400">
            Não possui uma conta?{' '}
            <Link
              href="/login"
              className=" text-gray-950 duration-300 hover:text-primary  hover:no-underline"
            >
              Cadastre-se
            </Link>
          </span>
        </FormFooter> */}
      </FormRoot>
    </main>
  );
}

// 15 min accessToken 7 dias refresh
