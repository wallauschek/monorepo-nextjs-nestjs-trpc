import type { Meta, StoryFn } from '@storybook/react';

import Footer, { IFooter } from './Footer';
import { mockFooterProps } from './Footer.mocks';

export default {
  title: 'Organisms/Footer',
  component: Footer,
  argTypes: {}
} as Meta<typeof Footer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockFooterProps.base
} as IFooter;
