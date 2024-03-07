import { render } from '@/tests/test-utils';

import LoadPage from './LoadPage';

describe('LoadPage', () => {
  it('should render the heading', () => {
    render(<LoadPage title="LoadPage" />);

    // Assert
    // screen.getByRole('heading', { name: /LoadPage/i });
  });
});
