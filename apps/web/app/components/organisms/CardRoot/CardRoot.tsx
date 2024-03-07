import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ICardRoot extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardRoot: React.FC<ICardRoot> = ({ children, className, ...props }) => {
  return (
    <div className={twMerge('', className)} {...props}>
      {children}
    </div>
  );
};

export default CardRoot;
