import { render, screen } from '@/tests/test-utils';

import CardFooter from './CardFooter';

describe('CardFooter', () => {
  it('should render the heading', () => {
    render(<CardFooter data-testid="cardTest">TEST</CardFooter>);

    // Assert
    screen.getByTestId('cardTest');
  });
});
