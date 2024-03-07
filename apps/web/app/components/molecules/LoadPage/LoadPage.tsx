'use client';

import { Loader2 } from 'lucide-react';

// import Image from 'next/image';
// import logoCel from '@web/public/logo_cel_trans.svg';
// import logoFranco from '@web/public/logo_franco_trans.svg';
export interface ILoadPage {
  title?: string;
}

const LoadPage: React.FC<ILoadPage> = () => {
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-full w-full   items-center justify-center gap-1 bg-white font-semibold text-gray-300">
      {/* <Image
        alt="logo escola"
        src={process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? logoFranco : logoCel}
        className={`mx-auto animate-pulse  ${
          process.env.NEXT_PUBLIC_DOMAIN === window.location.host ? 'w-36' : 'w-28'
        } `}
      /> */}
      <span className="flex animate-pulse gap-1">
        <Loader2 className="animate-spin" />
        Carregando...
      </span>
    </div>
  );
};

export default LoadPage;
