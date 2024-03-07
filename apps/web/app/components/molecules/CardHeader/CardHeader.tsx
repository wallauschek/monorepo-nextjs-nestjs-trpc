import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ICardHeader extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader: React.FC<ICardHeader> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('', className)} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
