import { render, screen } from '@/tests/test-utils';

import CardHeader from './CardHeader';

describe('CardHeader', () => {
  it('should render the heading', () => {
    render(<CardHeader data-testid="cardTest">TEST</CardHeader>);

    // Assert
    screen.getByTestId('cardTest');
  });
});
