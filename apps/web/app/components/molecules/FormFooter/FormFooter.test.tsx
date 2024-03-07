import { render, screen } from '@/tests/test-utils';

import FormFooter from './FormFooter';

describe('FormFooter', () => {
  it('should render the heading', () => {
    render(
      <FormFooter data-testid="footerTest">
        <h1>FOOTER TEST</h1>
      </FormFooter>
    );

    // Assert
    screen.getByTestId('footerTest');
  });
});
