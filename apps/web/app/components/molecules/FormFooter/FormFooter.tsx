import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IFormFooter extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FormFooter: React.FC<IFormFooter> = ({ children, className, ...rest }) => {
  return (
    <div className={twMerge('', className)} {...rest}>
      {children}
    </div>
  );
};

export default FormFooter;
