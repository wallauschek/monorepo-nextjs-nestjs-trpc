import { IPasswordVisibilityToggle } from './PasswordVisibilityToggle';

const base: IPasswordVisibilityToggle = {
  setShowPassword: () => false,
  showPassword: true
};

export const mockPasswordVisibilityToggleProps = {
  base
};
