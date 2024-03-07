import { render, screen } from '@/tests/test-utils';

import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
  it('should render the heading', () => {
    render(<ShoppingCart />);

    // Assert
    screen.getByTestId('shoppingCartTest');
  });
});
