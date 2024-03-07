import { IFormFooter } from './FormFooter';

const base: IFormFooter = {
  children: (
    <>
      <span className="  text-sm text-gray-400">
        Não possui uma conta?{' '}
        <a href="/login" className=" text-gray-950 duration-300  hover:text-red-400">
          Cadastre-se
        </a>
      </span>
    </>
  ),
  className: 'mt-auto py-3 text-center md:mt-0 border rounded-sm'
};

export const mockFormFooterProps = {
  base
};
