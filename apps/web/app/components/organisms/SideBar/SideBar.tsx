'use client';
import { Home, BookOpenText } from 'lucide-react';
import { useState } from 'react';
import Link from '../../atoms/Link/Link';

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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
      <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Fechar' : 'Abrir'}
      </button>
    <div className={`... ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
    </div>
    </>
  );
}