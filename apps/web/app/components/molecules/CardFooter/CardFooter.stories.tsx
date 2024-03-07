import type { Meta, StoryFn } from '@storybook/react';

import CardFooter, { ICardFooter } from './CardFooter';
import { mockCardFooterProps } from './CardFooter.mocks';

export default {
  title: 'Molecules/CardFooter',
  component: CardFooter,
  argTypes: {}
} as Meta<typeof CardFooter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CardFooter> = (args) => <CardFooter {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockCardFooterProps.base
} as ICardFooter;
