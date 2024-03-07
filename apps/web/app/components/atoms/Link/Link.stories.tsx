import type { Meta, StoryFn } from '@storybook/react';

import Link, { ILink } from './Link';
import { mockLinkProps } from './Link.mocks';

export default {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {}
} as Meta<typeof Link>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Link> = (args) => <Link {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockLinkProps.base
} as ILink;
