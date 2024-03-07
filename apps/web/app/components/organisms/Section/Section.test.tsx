import { render, screen } from '@/tests/test-utils';

import Section from './Section';

describe('Section', () => {
  it('should render the heading', () => {
    render(<Section data-testid="sectionTest">TEST</Section>);

    // Assert
    screen.getByTestId('sectionTest');
  });
});
