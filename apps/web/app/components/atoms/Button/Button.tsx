import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'link' | 'primary' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: ReactNode;
}

export const variants = {
  variant: {
    default:
      'bg-transparent shadow-sm  border border-primary hover:text-white active:text-white text-primary rounded-sm hover:bg-primary active:bg-primary duration-300',
    secondary:
      '  text-white shadow-sm  text-secondary hover:bg-secondary hover:text-white active:bg-secondary active:text-white duration-300 border border-secondary rounded-sm',
    primary:
      'bg-primary text-white shadow-sm  hover:bg-transparent hover:text-primary active:bg-transparent active:text-primary duration-300 border border-primary rounded-sm',

    link: 'text-primary shadow-sm  underline-offset-4 hover:underline rounded-sm',
    destructive: 'border-none text-gray-400 font-secondary duration-300'
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  }
};

const Button: React.FC<IButton> = ({
  className,
  size = 'default',
  variant = 'default',
  children,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `font-secondary disabled:opacity-70 disabled:hover:bg-primary disabled:hover:text-white ${variants.size[size]} ${variants.variant[variant]} `,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
