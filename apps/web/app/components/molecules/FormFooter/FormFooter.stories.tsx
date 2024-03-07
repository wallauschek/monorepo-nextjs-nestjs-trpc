import type { Meta, StoryFn } from '@storybook/react';

import FormFooter, { IFormFooter } from './FormFooter';
import { mockFormFooterProps } from './FormFooter.mocks';

export default {
  title: 'Molecules/FormFooter',
  component: FormFooter,
  argTypes: {}
} as Meta<typeof FormFooter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FormFooter> = (args) => <FormFooter {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockFormFooterProps.base
} as IFormFooter;
