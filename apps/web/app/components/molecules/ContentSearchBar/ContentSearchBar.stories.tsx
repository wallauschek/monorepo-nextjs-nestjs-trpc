import type { Meta, StoryFn } from '@storybook/react';

import ContentSearchBar, { IContentSearchBar } from './ContentSearchBar';
import { mockContentSearchBarProps } from './ContentSearchBar.mocks';

export default {
  title: 'Molecules/ContentSearchBar',
  component: ContentSearchBar,
  argTypes: {}
} as Meta<typeof ContentSearchBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ContentSearchBar> = (args) => <ContentSearchBar {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockContentSearchBarProps.base
} as IContentSearchBar;
