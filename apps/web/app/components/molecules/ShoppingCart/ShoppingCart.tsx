import Link from '@web/app/components/atoms/Link/Link';
import { Separator } from '@web/app/components/ui/separator';
import * as cookie from 'cookies-next';
import { decode } from 'jsonwebtoken';
import { BookOpenText, Clock, Loader2, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import { CELFiliais, calcularTempoRestante } from '@web/lib/utils';

import { UserToken } from '@web/interfaces/UserToken';
import appStore from '@web/stores/app';
import menuTogglesStore from '@web/stores/menuToggles';

export interface IShoppingCart {
  title?: string;
}

const ShoppingCart: React.FC<IShoppingCart> = observer(() => {
  const data: any[] = [];
  const isLoading = false;

  return (
    <div data-testid="shoppingCartTest" className="  relative md:order-1">
      <div className="group">
        <span className="absolute -right-1 -top-4 flex h-6 w-6 cursor-default items-center justify-center rounded-full bg-primary  font-secondary text-xs font-bold text-white duration-300 ">
          {isLoading ? 0 : data.filter((item: any) => item?.status === 'aberto').length}
        </span>
        <ShoppingCartIcon className="relative mx-auto w-10 duration-300 group-hover:text-primary " />
      </div>

      
    </div>
  );
});

export default ShoppingCart;
