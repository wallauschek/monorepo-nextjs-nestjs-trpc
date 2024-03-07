import type { Meta, StoryFn } from '@storybook/react';

import CardRoot, { ICardRoot } from './CardRoot';
import { mockCardRootProps } from './CardRoot.mocks';

export default {
  title: 'Organisms/CardRoot',
  component: CardRoot,
  argTypes: {}
} as Meta<typeof CardRoot>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CardRoot> = (args) => <CardRoot {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockCardRootProps.base
} as ICardRoot;
