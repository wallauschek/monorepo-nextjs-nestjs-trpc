import type { Meta, StoryFn } from '@storybook/react';

import ShoppingCart, { IShoppingCart } from './ShoppingCart';
import { mockShoppingCartProps } from './ShoppingCart.mocks';

export default {
  title: 'Molecules/ShoppingCart',
  component: ShoppingCart,
  argTypes: {}
} as Meta<typeof ShoppingCart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ShoppingCart> = (args) => <ShoppingCart {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = Template.bind({});
Base.args = {
  ...mockShoppingCartProps.base
} as IShoppingCart;
