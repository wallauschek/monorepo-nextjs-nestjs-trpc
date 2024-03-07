import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { variants } from '../Button/Button';

export interface ILink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  variant?: 'default' | 'link' | 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
const Link: React.FC<ILink> = ({ href, className, children, variant, size, ...props }) => {
  return (
    <a
      href={href}
      className={twMerge(
        `font-secondary text-gray-400 duration-300 hover:text-primary hover:no-underline active:text-primary ${
          variant && variants.variant[variant]
        } ${size && variants.size[size]}`,
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
