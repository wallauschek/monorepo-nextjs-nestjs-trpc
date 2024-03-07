import { render, screen } from '@/tests/test-utils';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render the heading', () => {
    render(
      <NavBar data-testid="navBarTest" title="NavBar">
        <span>TEST</span>
      </NavBar>
    );

    // Assert
    screen.getByTestId('navBarTest');
  });
});
