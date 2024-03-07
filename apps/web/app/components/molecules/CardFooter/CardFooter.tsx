import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ICardFooter extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardFooter: React.FC<ICardFooter> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('', className)} {...props}>
      {children}
    </div>
  );
};

export default CardFooter;
