'use client';
import clsx from 'clsx';
import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg overflow-hidden',
    'flex flex-col mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    'sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-4 [&>svg]:h-4',
    'px-4 flex items-center justify-start gap-2 cursor-pointer',
    'transition hover:bg-slate-800',
    'h-10 shrink-0',
  );
  const openClosedBtnClasses = clsx(
    linkClasses,
    'text-blue-200 italic',
    'sm:hidden',
  );
  return (
    <nav className={navClasses}>
      <button
        className={clsx(openClosedBtnClasses, 'rounded-lg')}
        onClick={() => setIsOpen(s => !s)}
      >
        {!isOpen && (
          <>
            <MenuIcon /> Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon /> Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>
      <Link className={linkClasses} href='/user/post'>
        <FileTextIcon />
        Posts
      </Link>
      <Link className={linkClasses} href='/user/post/new'>
        <PlusIcon />
        Criar Post
      </Link>
    </nav>
  );
}
