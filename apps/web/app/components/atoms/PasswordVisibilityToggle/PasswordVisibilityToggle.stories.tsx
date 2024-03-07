import type { Meta, StoryFn } from '@storybook/react';

import PasswordVisibilityToggle, { IPasswordVisibilityToggle } from './PasswordVisibilityToggle';
import { mockPasswordVisibilityToggleProps } from './PasswordVisibilityToggle.mocks';

export default {
  title: 'Atoms/PasswordVisibilityToggle',
  component: PasswordVisibilityToggle,
  argTypes: {}
} as Meta<typeof PasswordVisibilityToggle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof PasswordVisibilityToggle> = (args) => (
  <PasswordVisibilityToggle {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockPasswordVisibilityToggleProps.base
} as IPasswordVisibilityToggle;
