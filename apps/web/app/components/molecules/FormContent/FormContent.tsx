import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IFormContent extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FormContent: React.FC<IFormContent> = ({ children, className, ...rest }) => {
  return (
    <div className={twMerge('', className)} {...rest}>
      {children}
    </div>
  );
};

export default FormContent;
