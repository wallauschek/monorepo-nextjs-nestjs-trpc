import { render, screen } from '@/tests/test-utils';

import FormRoot from './FormRoot';

describe('FormRoot', () => {
  it('should render the heading', () => {
    render(
      <FormRoot data-testid="rootTest" onSubmitFunction={() => console.log('test')}>
        <h1>ROOT TEST</h1>
      </FormRoot>
    );

    // Assert
    screen.getByTestId('rootTest');
  });
});
