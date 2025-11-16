'use client';

import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: string;
  url: string;
  as?: 'h1' | 'h2';
  className?: string;
};

export default function PostHeading({
  children,
  url,
  as: Tag = 'h2',
  className,
}: PostHeadingProps) {
  const headingClassMap = {
    h1: 'text-2xl/tight sm:text-4xl font-extrabold',
    h2: 'text-2xl/tight font-bold',
  };

  return (
    <Tag className={clsx(headingClassMap[Tag], className)}>
      <Link className={clsx('hover:text-slate-800 transition')} href={url}>
        {children}
      </Link>
    </Tag>
  );
}
