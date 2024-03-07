import { render, screen } from '@/tests/test-utils';

import ContentSearchBar from './ContentSearchBar';

describe('ContentSearchBar', () => {
  it('should render the heading', () => {
    render(
      <ContentSearchBar
        data={[]}
        inputValue=""
        loadingWP={false}
        data-testid="contentSearchBarTest"
      />
    );

    // Assert
    screen.getByTestId('contentSearchBarTest');
  });
});
