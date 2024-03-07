import { render, screen } from '@/tests/test-utils';

import CardContent from './CardContent';

describe('CardContent', () => {
  it('should render the heading', () => {
    render(<CardContent data-testid="cardTest">TEST</CardContent>);

    // Assert
    screen.getByTestId('cardTest');
  });
});
