import type { Meta, StoryFn } from '@storybook/react';

import FormHeader, { IFormHeader } from './FormHeader';
import { mockFormHeaderProps } from './FormHeader.mocks';

export default {
  title: 'Molecules/FormHeader',
  component: FormHeader,
  argTypes: {}
} as Meta<typeof FormHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FormHeader> = (args) => <FormHeader {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockFormHeaderProps.base
} as IFormHeader;
