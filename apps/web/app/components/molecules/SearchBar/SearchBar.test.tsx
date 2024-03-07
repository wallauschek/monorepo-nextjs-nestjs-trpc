import { render, screen } from '@/tests/test-utils';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render the heading', () => {
    render(<SearchBar data-testid="searchBarTest" />);

    // Assert
    screen.getByTestId('searchBarTest');
  });
});
