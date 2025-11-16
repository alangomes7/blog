'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
type FooterProps = {
  text?: string;
};
export default function Footer({ text }: FooterProps) {
  return (
    <footer>
      <div className={clsx('text-center')}>
        <h1>{text}</h1>
        <p>
          Copyright &copy; {new Date().getFullYear()} -{' '}
          <Link href='/'>The Blog</Link>
        </p>
      </div>
    </footer>
  );
}
