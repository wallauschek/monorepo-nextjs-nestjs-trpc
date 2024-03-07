import { IConfirmShoppingCard } from './ConfirmShoppingCard';

const base: IConfirmShoppingCard = {
  items: [],
  closeFunction: () => console.log('test'),
  setCoursesSelected: () => console.log('test'),
  setItemsExpired: () => console.log('test'),
  expired: [],
  urlBoleto: 'http://test.com/teste.pdf'
};

export const mockConfirmShoppingCardProps = {
  base
};
