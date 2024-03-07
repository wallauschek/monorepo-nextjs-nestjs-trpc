import { render, screen } from '@/tests/test-utils';

import { MainProvider, Props } from '.';

interface MainProviderProps extends Props {
  pageProps: Record<string, unknown>;
}

describe('MainProvider', () => {
  it('should render the children components', () => {
    const props: MainProviderProps = {
      pageProps: {},
      children: <h1>MainLayout children</h1>
    };

    render(<MainProvider {...props} />);

    // Assert
    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
