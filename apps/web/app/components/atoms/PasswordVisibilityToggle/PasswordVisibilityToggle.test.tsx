import { render, screen } from '@/tests/test-utils';

import PasswordVisibilityToggle from './PasswordVisibilityToggle';

describe('PasswordVisibilityToggle', () => {
  it('should render the heading', () => {
    render(<PasswordVisibilityToggle setShowPassword={() => false} showPassword={true} />);

    // Assert
    screen.getByTestId('toggleTest');
  });
});
