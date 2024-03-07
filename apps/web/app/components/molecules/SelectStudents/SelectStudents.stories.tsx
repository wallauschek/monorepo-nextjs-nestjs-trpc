import type { Meta, StoryFn } from '@storybook/react';

import SelectStudents, { ISelectStudents } from './SelectStudents';
// import { mockSelectStudentsProps } from './SelectStudents.mocks';

export default {
  title: 'Molecules/SelectStudents',
  component: SelectStudents,
  argTypes: {}
} as Meta<typeof SelectStudents>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SelectStudents> = (args) => <SelectStudents {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  // ...mockSelectStudentsProps.base
} as ISelectStudents;
