import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import Footer from '@web/app/components/organisms/Footer/Footer';
import NavBar from '@web/app/components/organisms/NavBar/NavBar';

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  showUserInfoPanel?: boolean;
}

// This is the place responsible for wrapping your app.
// Add here components like Footer, Nav etc.
export const MainLayout = ({
  children,
  className,
  showUserInfoPanel = false,
  ...props
}: MainLayoutProps) => {
  // const cookies = new Cookie();
  // const access_token = cookies.get('access_token');
  // const refresh_token = cookies.get('refresh_token');
  // const router = useRouter();
  // setInterval(() => {
  //   if (access_token) {
  //     if (refresh_token) {
  //       cookies.set('redirectTo', window.location.href, { maxAge: 300, path: '/auth/refresh' });
  //       console.log('entrouu');

  //       return router.push('/auth/refresh');
  //     } else {
  //       return router.push('/login');
  //     }
  //   }
  //   // console.log('');
  // }, 10000);

  return (
    <div className={twMerge(' min-h-screen', className)} {...props}>
      <NavBar showUserInfoPanel={showUserInfoPanel} />
      {children}
      <Footer />
    </div>
  );
};
