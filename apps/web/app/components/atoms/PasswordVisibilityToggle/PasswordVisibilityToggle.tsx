import { Eye, EyeOff } from 'lucide-react';
import { Dispatch } from 'react';

export interface IPasswordVisibilityToggle {
  setShowPassword: Dispatch<boolean>;
  showPassword: boolean;
}

const PasswordVisibilityToggle: React.FC<IPasswordVisibilityToggle> = ({
  setShowPassword,
  showPassword
}) => {
  return (
    <div
      data-testid="toggleTest"
      onClick={() => setShowPassword(!showPassword)}
      className="group  absolute inset-y-0 right-0 flex cursor-pointer items-center px-2"
    >
      {!showPassword ? (
        <Eye
          size={20}
          className="w-4 cursor-pointer text-gray-300 duration-300 group-hover:text-gray-500"
        />
      ) : (
        <EyeOff
          size={20}
          className="w-4 cursor-pointer text-gray-300 duration-300 group-hover:text-gray-500"
        />
      )}
    </div>
  );
};

export default PasswordVisibilityToggle;
