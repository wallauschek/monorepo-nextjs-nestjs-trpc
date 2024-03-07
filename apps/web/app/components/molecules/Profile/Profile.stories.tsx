import type { Meta, StoryFn } from '@storybook/react';

import Profile, { IProfile } from './Profile';
import { mockProfileProps } from './Profile.mocks';

export default {
  title: 'Molecules/Profile',
  component: Profile,
  argTypes: {}
} as Meta<typeof Profile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Profile> = (args) => <Profile {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockProfileProps.base
} as IProfile;
