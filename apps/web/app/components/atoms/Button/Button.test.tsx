import { render, screen } from '@/tests/test-utils';

import Button from './Button';

describe('ButtonTest', () => {
  it('should render the button', () => {
    render(<Button data-testid="buttonTest">TEST</Button>);

    // Assert
    screen.getByTestId('buttonTest');
  });
});
