import type { Meta, StoryFn } from '@storybook/react';

import CardHeader, { ICardHeader } from './CardHeader';
import { mockCardHeaderProps } from './CardHeader.mocks';

export default {
  title: 'Molecules/CardHeader',
  component: CardHeader,
  argTypes: {}
} as Meta<typeof CardHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CardHeader> = (args) => <CardHeader {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockCardHeaderProps.base
} as ICardHeader;
