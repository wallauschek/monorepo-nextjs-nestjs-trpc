import { twMerge } from 'tailwind-merge';

export type IInput = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IInput> = ({ className, ...rest }) => {
  return (
    <input
      className={twMerge(
        ` w-full rounded-sm border border-gray-200 p-2 text-sm shadow duration-300 hover:border-primary md:text-base `,
        className
      )}
      {...rest}
    />
  );
};

export default Input;
