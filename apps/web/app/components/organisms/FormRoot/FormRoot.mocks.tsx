import Input from '@web/app/components/atoms/Input/Input';
import FormContent from '@web/app/components/molecules/FormContent/FormContent';
import FormFooter from '@web/app/components/molecules/FormFooter/FormFooter';

import { IFormRoot } from './FormRoot';

const base: IFormRoot = {
  children: (
    <>
      <FormContent className="flex flex-col items-center space-y-10 ">
        <div className=" flex w-full flex-col items-center space-y-5">
          <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
            <label htmlFor="email" className=" text-sm text-gray-400 md:text-base">
              Usuário
            </label>
            <Input type="text" placeholder="Digite seu usuário" />
          </div>
          <div className=" flex w-[90%] max-w-sm flex-col gap-1.5">
            <label htmlFor="senha" className=" text-sm text-gray-400 md:text-base">
              Senha
            </label>
            <Input type="password" placeholder="Digite sua senha" />
            <a
              href="/login"
              className="ml-auto text-sm duration-300 hover:text-[#d6141a] md:text-base"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div className="flex w-full flex-col items-center space-y-3 bg-gray-300 p-3">
          <span>BUTTONS</span>
        </div>
      </FormContent>
      <FormFooter className="mt-auto py-3 text-center md:mt-0">
        <span className="  text-sm text-gray-400">
          Não possui uma conta?{' '}
          <a href="/login" className=" text-gray-950 duration-300  hover:text-[#d6141a]">
            Cadastre-se
          </a>
        </span>
      </FormFooter>
    </>
  ),
  className:
    'flex flex-col md:w-[70%]  md:flex-col md:space-y-5 md:justify-self-center md:rounded-sm md:border  md:border-gray-200  md:pt-6 md:shadow',
  onSubmitFunction: () => {
    console.log('test');
  }
};

export const mockFormRootProps = {
  base
};
