import { FormEvent, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IFormRoot extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmitFunction: (event: FormEvent<HTMLFormElement>) => void;
}

const FormRoot: React.FC<IFormRoot> = ({ children, onSubmitFunction, className, ...rest }) => {
  return (
    <form className={twMerge('', className)} {...rest} onSubmit={onSubmitFunction}>
      {children}
    </form>
  );
};

export default FormRoot;
