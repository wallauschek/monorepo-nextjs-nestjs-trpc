import type { Meta, StoryFn } from '@storybook/react';

import Section, { ISection } from './Section';
import { mockSectionProps } from './Section.mocks';

export default {
  title: 'Organisms/Section',
  component: Section,
  argTypes: {}
} as Meta<typeof Section>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Section> = (args) => <Section {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockSectionProps.base
} as ISection;
