import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ICardContent extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardContent: React.FC<ICardContent> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('', className)} {...props}>
      {children}
    </div>
  );
};

export default CardContent;
