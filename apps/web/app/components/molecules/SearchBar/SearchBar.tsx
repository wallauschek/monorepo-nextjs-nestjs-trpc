import { Search } from 'lucide-react';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import Input from '@web/app/components/atoms/Input/Input';
import { ToastAction } from '@web/app/components/ui/toast';
import { useToast } from '@web/app/components/ui/use-toast';

import appStore from '@web/stores/app';
import menuTogglesStore from '@web/stores/menuToggles';
import ContentSearchBar from '../ContentSearchBar/ContentSearchBar';

export interface ISearchBar extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const SearchBar: React.FC<ISearchBar> = observer(({ ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const { setSearchBar, searchBar, menuMobile, profileDesktop, confirmLogout } =
    menuTogglesStore;
  const [isMenuOpen, setIsMenuOpen] = useState(searchBar);

  useEffect(() => {
    if (isMenuOpen === false) setIsMenuOpen(setSearchBar());
    if (searchValue === '') setIsMenuOpen(setSearchBar());
  }, [searchValue]);


  useEffect(() => {
    if (menuMobile || profileDesktop || confirmLogout)
      setIsMenuOpen(setSearchBar(false));
  }, [menuMobile, profileDesktop]);

  return (
    <div {...props} className="relative col-span-3   md:col-span-1">
      <Input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        className=" py-2 pl-8   pr-4 md:w-[50%] md:min-w-[220px]"
        placeholder="busque o que deseja..."
      />
      <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
        <Search size={20} className="w-4 text-gray-300" />
      </div>
      {isMenuOpen ? (
        <ContentSearchBar data={data} inputValue={searchValue} />
      ) : null}
    </div>
  );
});

export default SearchBar;
