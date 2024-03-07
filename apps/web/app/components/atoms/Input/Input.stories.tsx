import type { Meta, StoryFn } from '@storybook/react';

import Input, { IInput } from './Input';
import { mockInputProps } from './Input.mocks';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {}
} as Meta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockInputProps.base
} as IInput;
