import type { Meta, StoryFn } from '@storybook/react';

import FormRoot, { IFormRoot } from './FormRoot';
import { mockFormRootProps } from './FormRoot.mocks';

export default {
  title: 'Organisms/FormRoot',
  component: FormRoot,
  argTypes: {}
} as Meta<typeof FormRoot>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FormRoot> = (args) => <FormRoot {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockFormRootProps.base
} as IFormRoot;
