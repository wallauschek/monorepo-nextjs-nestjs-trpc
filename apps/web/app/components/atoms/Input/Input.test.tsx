import { render, screen } from '@web/.jest/test-utils';

import Input from './Input';

describe('Input', () => {
  it('should render the heading', () => {
    render(<Input title="Input" data-testid="inputTest" />);

    // Assert
    screen.getByTestId('inputTest');
  });
});
