import type { Meta, StoryFn } from '@storybook/react';

import FormContent, { IFormContent } from './FormContent';
import { mockFormContentProps } from './FormContent.mocks';

export default {
  title: 'Molecules/FormContent',
  component: FormContent,
  argTypes: {}
} as Meta<typeof FormContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FormContent> = (args) => <FormContent {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockFormContentProps.base
} as IFormContent;
