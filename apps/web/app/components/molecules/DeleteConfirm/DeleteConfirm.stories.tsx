import type { Meta, StoryFn } from '@storybook/react';

import DeleteConfirm, { IDeleteConfirm } from './DeleteConfirm';
import { mockDeleteConfirmProps } from './DeleteConfirm.mocks';

export default {
  title: 'Molecules/DeleteConfirm',
  component: DeleteConfirm,
  argTypes: {}
} as Meta<typeof DeleteConfirm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DeleteConfirm> = (args) => <DeleteConfirm {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockDeleteConfirmProps.base
} as IDeleteConfirm;
