import type { Meta, StoryFn } from '@storybook/react';

import LoadPage, { ILoadPage } from './LoadPage';
import { mockLoadPageProps } from './LoadPage.mocks';

export default {
  title: 'Molecules/LoadPage',
  component: LoadPage,
  argTypes: {}
} as Meta<typeof LoadPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof LoadPage> = (args) => <LoadPage {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockLoadPageProps.base
} as ILoadPage;
