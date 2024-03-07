import type { Meta, StoryFn } from '@storybook/react';

import Button, { IButton } from './Button';
import { mockButtonIButtonProps } from './Button.mocks';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {}
} as Meta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockButtonIButtonProps.base
} as IButton;

// export const Link = Template.bind({});
// Link.args = {
//   variant: 'link',
//   title: 'Link'
// } as IButton;

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  title: 'Secondary',
  className: 'bg-gray-950 border-gray-950 hover:text-gray-950'
} as IButton;
