'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
type HeaderProps = {
  text?: string;
  link: string;
};
export default function Header({ text, link }: HeaderProps) {
  return (
    <header>
      <h1
        className={clsx(
          'text-4xl/normal py-8 font-extrabold text-black',
          'sm:text-5xl/normal sm:py-10',
          'md:text-6xl/normal md:py-11',
          'lg:text-7xl/normal lg:py-12',
        )}
      >
        <Link href={link}>{text}</Link>
      </h1>
    </header>
  );
}
