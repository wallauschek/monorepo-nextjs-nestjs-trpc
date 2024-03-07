import { twMerge } from 'tailwind-merge';

import Link from '@web/app/components/atoms/Link/Link';

export interface ISignIn extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const SignIn: React.FC<ISignIn> = ({ className, ...props }) => {
  return (
    <div
      data-testid="signintest"
      className={twMerge(
        'flex max-md:flex-col max-md:space-y-2 md:justify-center md:space-x-2 md:text-center ',
        className
      )}
      {...props}
    >
      {/* Mobile */}
      <Link href="/login" className="ml-2 font-semibold md:hidden">
        Login
      </Link>
      <Link href="" className="ml-2 font-semibold md:hidden">
        Cadastrar-se
      </Link>

      <Link href="/login" className=" p-2 px-5 max-md:hidden" variant="primary">
        Login
      </Link>
      <Link href="" className="min-w-[150px] p-2 px-5 max-md:hidden " variant="primary">
        Cadastrar-se
      </Link>
    </div>
  );
};

export default SignIn;
