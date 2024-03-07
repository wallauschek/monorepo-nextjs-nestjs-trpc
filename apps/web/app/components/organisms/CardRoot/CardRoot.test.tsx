import { render, screen } from '@/tests/test-utils';

import CardRoot from './CardRoot';

describe('CardRoot', () => {
  it('should render the heading', () => {
    render(<CardRoot data-testid="cardTest">TEST</CardRoot>);

    // Assert
    screen.getByTestId('cardTest');
  });
});
