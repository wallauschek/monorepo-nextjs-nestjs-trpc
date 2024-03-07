import { render, screen } from '@/tests/test-utils';

import FormContent from './FormContent';

describe('FormContent', () => {
  it('should render the heading', () => {
    render(
      <FormContent data-testid="contentTest">
        <h1>CONTENT TEXT</h1>
      </FormContent>
    );

    // Assert
    screen.getByTestId('contentTest');
  });
});
