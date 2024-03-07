import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ISection extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Section: React.FC<ISection> = ({ className, children, ...props }) => {
  return (
    <section className={twMerge('p-5  md:p-10', className)} {...props}>
      {children}
    </section>
  );
};

export default Section;
