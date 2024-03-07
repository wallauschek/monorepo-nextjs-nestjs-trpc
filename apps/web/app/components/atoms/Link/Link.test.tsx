import { render, screen } from '@/tests/test-utils';

import Link from './Link';

describe('Link', () => {
  it('should render the heading', () => {
    render(
      <Link href="/test" data-testid="linkTest">
        TEST
      </Link>
    );

    // Assert
    screen.getByTestId('linkTest');
  });
});
