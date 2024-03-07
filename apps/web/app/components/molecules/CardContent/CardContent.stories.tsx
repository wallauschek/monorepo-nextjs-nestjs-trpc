import type { Meta, StoryFn } from '@storybook/react';

import CardContent, { ICardContent } from './CardContent';
import { mockCardContentProps } from './CardContent.mocks';

export default {
  title: 'Molecules/CardContent',
  component: CardContent,
  argTypes: {}
} as Meta<typeof CardContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CardContent> = (args) => <CardContent {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockCardContentProps.base
} as ICardContent;
