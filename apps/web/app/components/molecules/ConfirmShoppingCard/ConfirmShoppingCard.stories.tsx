import type { Meta, StoryFn } from '@storybook/react';

import ConfirmShoppingCard, { IConfirmShoppingCard } from './ConfirmShoppingCard';
import { mockConfirmShoppingCardProps } from './ConfirmShoppingCard.mocks';

export default {
  title: 'Molecules/ConfirmShoppingCard',
  component: ConfirmShoppingCard,
  argTypes: {}
} as Meta<typeof ConfirmShoppingCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ConfirmShoppingCard> = (args) => <ConfirmShoppingCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockConfirmShoppingCardProps.base
} as IConfirmShoppingCard;
