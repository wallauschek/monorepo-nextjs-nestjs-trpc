import type { Meta, StoryFn } from '@storybook/react';

import NavBar, { INavBar } from './NavBar';
import { mockNavBarProps } from './NavBar.mocks';

export default {
  title: 'Organisms/NavBar',
  component: NavBar,
  argTypes: {}
} as Meta<typeof NavBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof NavBar> = (args) => <NavBar {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockNavBarProps.base
} as INavBar;
