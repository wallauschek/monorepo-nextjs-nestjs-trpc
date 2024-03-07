import type { Meta, StoryFn } from '@storybook/react';

import SearchBar, { ISearchBar } from './SearchBar';
import { mockSearchBarProps } from './SearchBar.mocks';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  argTypes: {}
} as Meta<typeof SearchBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SearchBar> = (args) => <SearchBar {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockSearchBarProps.base
} as ISearchBar;
