import { render, screen } from '@/tests/test-utils';

import Footer from './Footer';

describe('Footer', () => {
  it('should render the heading', () => {
    render(<Footer data-testid="footerTest" />);

    // Assert
    screen.getByTestId('footerTest');
  });
});
