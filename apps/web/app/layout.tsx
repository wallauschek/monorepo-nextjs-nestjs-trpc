import '@web/styles/globals.css';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import { ReactNode } from 'react';

import { Toaster } from '@web/app/components/ui/toaster';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-primary' });

const roboto = Roboto({ subsets: ['latin'], variable: '--font-secondary', weight: '400' });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${
      process.env.NEXT_PUBLIC_DOMAIN === headers().get('host')
        ? 'Centro Cultural'
        : 'Atividades Extras'
    }`
  };
}

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable}  h-screen bg-white font-primary text-gray-950`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
