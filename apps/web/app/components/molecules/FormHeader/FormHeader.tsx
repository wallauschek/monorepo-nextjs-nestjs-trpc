import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IFormHeader extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FormHeader: React.FC<IFormHeader> = ({ children, className, ...rest }) => {
  return (
    <div className={twMerge('', className)} {...rest}>
      {children}
    </div>
  );
};

export default FormHeader;
