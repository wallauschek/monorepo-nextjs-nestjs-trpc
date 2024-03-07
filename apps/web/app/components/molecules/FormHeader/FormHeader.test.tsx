import { render, screen } from '@/tests/test-utils';

import FormHeader from './FormHeader';

describe('FormHeader', () => {
  it('should render the heading', () => {
    render(
      <FormHeader data-testid="headerTest">
        <h1>HEADER TEXT</h1>
      </FormHeader>
    );

    // Assert
    screen.getByTestId('headerTest');
  });
});
