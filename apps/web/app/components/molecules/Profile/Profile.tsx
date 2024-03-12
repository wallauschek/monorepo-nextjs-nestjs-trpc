// import * as cookie from 'cookies-next';
// import jwt from 'jsonwebtoken';
import * as cookie from 'cookies-next';
import { decode } from 'jsonwebtoken';
import { AlarmClock, BookOpenText, Home, LibraryBig, Menu, User, XCircle } from 'lucide-react';
import { observer } from 'mobx-react';
// import { Cookie } from 'next-cookie';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '@web/app/components/atoms/Button/Button';
import Link from '@web/app/components/atoms/Link/Link';

// import { apiBackEnd } from '@web/lib/api';
import { getUser } from '@web/lib/auth';

import menuTogglesStore from '@web/stores/menuToggles';
import LoadPage from '../LoadPage/LoadPage';
import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import appStore from '@web/stores/app';

export interface IProfile extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

// {
//   text: 'Meu perfil',
//   route: 'perfil',
//   icon: User2
// }

// {
//   text: 'Alunos',
//   route: 'meus-alunos',
//   icon: GraduationCap
// }

export const painelUser: any[] = [
  {
    icon: Home,
    text: 'Principal',
    route: '/'
  },
  {
    icon: BookOpenText,
    text: 'Boletim',
    route: '/academico/boletim'
  }
];

const Profile: React.FC<IProfile> = observer(({ className, ...props }): any => {
  const { profileDesktop, setProfileDesktop, menuMobile, /* searchBar, */ /* shoppingCart */ } =
    menuTogglesStore;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(getUser());
  const router = useRouter();

  useEffect(() => {
    const tokenCheckInterval = 2 * 60 * 1000;
    setInterval(async () => {
      const access_token = cookie.getCookie('access_token');
      const refresh_token = cookie.getCookie('refresh_token');
      const tokenExpirationThreshold = 3 * 60 * 1000; // 3 minutos em milissegundos
      if (access_token) {
        const access_token_decoded: any = decode(access_token);
        if (refresh_token && access_token_decoded.exp * 1000 - new Date().getTime() < tokenExpirationThreshold) {
          return await ChamadasBackEnd.refreshToken({
            refresh_token
          })
            .then((response) => {
              const { access_token, refresh_token } = response;

              const payload_access_token: any = decode(access_token);
              const payload_refresh_token: any = decode(refresh_token);

              cookie.setCookie('access_token', access_token, {
                expires: new Date(payload_access_token.exp * 1000)
              });
              cookie.setCookie('refresh_token', refresh_token, {
                expires: new Date(payload_refresh_token.exp * 1000)
              });

              setUser(payload_access_token);
              console.log('reviveuuuu');
            })
            .catch((err) => {
              console.log(err);

              return router.push('/login');
            });
        }
      } else {
        if (refresh_token) {
          return await ChamadasBackEnd.refreshToken({
            refresh_token          
          }).then((response) => {
              const { access_token, refresh_token } = response;

              const payload_access_token: any = decode(access_token);
              const payload_refresh_token: any = decode(refresh_token);

              cookie.setCookie('access_token', access_token, {
                expires: new Date(payload_access_token.exp * 1000)
              });
              cookie.setCookie('refresh_token', refresh_token, {
                expires: new Date(payload_refresh_token.exp * 1000)
              });

              setUser(payload_access_token);
            })
            .catch((err) => {
              console.log(err);

              return router.push('/login');
            });
        } else {
          return router.push('/login');
        }
      }
    }, tokenCheckInterval);
  }, [user]);

  const [isMenuOpen, setIsMenuOpen] = useState(profileDesktop);

  const names = user && user.name.split(' ');

  const firstNameInitial = names && names[0][0];

  useEffect(() => {
    if (menuMobile /* || searchBar || shoppingCart */) setIsMenuOpen(setProfileDesktop(false));
  }, [/* searchBar, shoppingCart, */ menuMobile]);

  // useEffect(() => {
  //   if (confirmLogout && !menuMobile) setIsMenuOpen(setConfirmLogout());
  // }, [confirmLogout, menuMobile]);

  return (
    <>
      <div
        className={twMerge('grid grid-cols-[1fr_min-content] items-center  md:w-min', className)}
        {...props}
      >
        {/* Desktop */}
        <Menu
          onClick={() => {
            setIsMenuOpen(setProfileDesktop());
          }}
          size={18}
          className="   duration-300 hover:text-primary active:text-primary max-md:hidden"
        />

        {isMenuOpen && (
          <>
            <div className="absolute right-12 top-24 z-20 grid min-w-[200px] rounded-sm border  border-gray-100 bg-white shadow-lg  max-md:hidden">
              <span className="justify-items mx-auto flex items-center gap-4 p-2 font-semibold  text-primary  ">
                <User size={16} />
                {(names && names[0]) || ''}
              </span>
              <span className="h-[1px] bg-gray-100" />
              {painelUser.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`${item.route}`}
                    className="flex items-center  p-2 hover:bg-gray-50 active:bg-gray-50 "
                  >
                    <item.icon size={16} className="mr-4" />
                    {item.text}
                  </Link>
                );
              })}
              <Button
                // href="/auth/logout"
                onClick={async () => {
                  setIsLoading(true);
                  const clearMenus = menuTogglesStore.clearAll();
                  const clearCourses = appStore.clearAll();

                  if (clearMenus && clearCourses) router.push('/api/auth/logout');
                }}
                type="button"
                className="flex items-center border-transparent p-2   text-gray-400 hover:bg-gray-50 hover:text-red-400 active:bg-gray-50 active:text-red-400 "
              >
                <XCircle size={16} className="mr-4" />
                Sair
              </Button>
            </div>
          </>
        )}

        {isLoading && <LoadPage />}
        {/* Mobile */}
        <Link
          href=""
          className=" col-span-2 flex w-full items-center space-x-2 px-3  md:hidden"
        >
          <span className="w-10 rounded-full bg-primary p-2 text-center text-white">{`${
            firstNameInitial || ''
          }`}</span>
          <span>{(names && names[0]) || ''}</span>
        </Link>
        <Button
          onClick={async () => {
            setIsLoading(true);
            const clearMenus = menuTogglesStore.clearAll();
            const clearCourses = appStore.clearAll();

            if (clearMenus && clearCourses) router.push('/api/auth/logout');
          }}
          variant="destructive"
          className=" flex items-center  justify-end p-3 text-red-500 duration-300 hover:text-red-400 active:text-red-400 md:hidden"
        >
          <XCircle size={16} className="mr-1" />
          Sair
        </Button>

        <div className="col-span-2  md:hidden">
          {painelUser.map((item, index) => {
            return (
              <Link
                key={index}
                href={`${item.route}`}
                className="flex items-center  p-2 active:bg-gray-50 "
              >
                <item.icon size={16} className="mr-4" />
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
});

export default Profile;
