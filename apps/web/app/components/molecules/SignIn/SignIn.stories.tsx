import type { Meta, StoryFn } from '@storybook/react';

import SignIn, { ISignIn } from './SignIn';
import { mockSignInProps } from './SignIn.mocks';

export default {
  title: 'Molecules/SignIn',
  component: SignIn,
  argTypes: {}
} as Meta<typeof SignIn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SignIn> = (args) => <SignIn {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockSignInProps.base
} as ISignIn;
