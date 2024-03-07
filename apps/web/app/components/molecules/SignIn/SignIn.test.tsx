import { render } from '@/tests/test-utils';

import SignIn from './SignIn';

describe('SignIn', () => {
  it('should render the heading', () => {
    render(<SignIn title="SignIn" />);

    // Assert
    // screen.getByTestId('signinTest');
  });
});
