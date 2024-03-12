'use client';
import { BookOpenText, Home, Menu, X } from 'lucide-react';
import { observer } from 'mobx-react';
import { Cookie } from 'next-cookie';
import Image from 'next/image';
import logoCel from '@web/public/logo_cel.svg';
import logoFranco from '@web/public/logo_franco.svg';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Link from '@web/app/components/atoms/Link/Link';
import Profile, { painelUser } from '@web/app/components/molecules/Profile/Profile';
// import SearchBar from '@web/app/components/molecules/SearchBar/SearchBar';
import SignIn from '@web/app/components/molecules/SignIn/SignIn';
import { Separator } from '@web/app/components/ui/separator';

import menuTogglesStore from '@web/stores/menuToggles';
import appStore from '@web/stores/app';

export interface INavBar extends React.HTMLAttributes<HTMLDivElement> {
  showUserInfoPanel?: boolean;
}

const rotasMobile: any[] = [
  {
    icon: Home,
    text: 'Principal',
    href: '/'
  },
  {
    icon: BookOpenText,
    text: 'Boletim',
    href: '/academico/boletim'
  }
];

const NavBar: React.FC<INavBar> = observer(({ className, showUserInfoPanel = false, ...props }) => {
  const { setmenuMobile, menuMobile } = menuTogglesStore;
  const [isMenuOpen, setIsMenuOpen] = useState(menuMobile);

  const { school } = appStore;
  const isAuthenticated = new Cookie().has('access_token');

  return (
<nav
  {...props}
  className={twMerge(
    `grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 pt-6 shadow-md`,
    className
  )}
>
  {/* Logo */}
  <a href="/" className="justify-self-start">
    <Image
      alt="logo escola"
      src={school === 'franco' ? logoFranco : logoCel}
      className={`mx-auto ${school === 'franco' ? 'w-28' : 'w-20'} `}
    />
  </a>

  {/* Espaço reservado para o centro da barra de navegação (se necessário) */}
  <div></div>

  {/* Botão do menu para dispositivos móveis */}
  <button onClick={() => setIsMenuOpen(setmenuMobile())} className="md:hidden justify-self-end">
    <Menu className="mx-auto w-10 duration-300 hover:text-primary" />
  </button>
      {/* <a
        href="/cursos"
        className="text-gray-400 duration-300 hover:text-primary hover:no-underline active:text-primary max-md:hidden"
      >
        Cursos
      </a> */}
      {isAuthenticated ? (
        <Profile className="order-last max-md:hidden" />
      ) : (
        <SignIn className="order-last max-md:hidden" />
      )}

      {/* <SearchBar /> */}

      {/* Camada de desfoque para o conteúdo fora do menu */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(setmenuMobile())}
          className=" fixed right-0 top-0 z-20 h-screen w-full bg-black/50"
        />
      )}

      {/* Menu Mobile */}
      <div
        className={`menu  ${
          isMenuOpen ? 'open' : ''
        } fixed right-0 top-0 z-20 h-screen space-y-3 bg-white  pt-5 shadow-sm`}
      >
        <X
          size={20}
          onClick={() => setIsMenuOpen(setmenuMobile())}
          className="ml-auto mr-2 mt-2 duration-300 hover:text-primary"
        />

        {isAuthenticated ? <Profile /> : <SignIn />}
        <Separator />

        <ul className="grid ">
          {rotasMobile.map((rota, index) => {
            return (
              <Link
                key={index}
                href={`${rota.href}`}
                className="flex items-center  p-2 active:bg-gray-50 "
              >
                <rota.icon size={16} className="mr-4" />
                {rota.text}
              </Link>
            );
          })}
        </ul>
      </div>
      {showUserInfoPanel && (
        <div className="order-last col-span-3 flex w-full gap-4 pt-4 ">
          {painelUser.map((item, index) => {
            if (window.location.pathname === `/painel/${item.route}`) {
              return (
                <Link
                  key={index}
                  className=" flex items-center rounded-sm border-b-2 border-b-primary p-2 text-primary  hover:bg-gray-50"
                  href={item.route}
                >
                  <item.icon size={16} className="mr-2 place-self-center" />
                  {item.text}
                </Link>
              );
            }

            return (
              <Link
                key={index}
                className=" flex items-center rounded-sm p-2   hover:bg-gray-50"
                href={`${item.route}`}
              >
                <item.icon size={16} className="mr-2 place-self-center" />
                {item.text}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
});

export default NavBar;
