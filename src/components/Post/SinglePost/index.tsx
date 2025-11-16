'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { PostHeading, PostTimeStamp, SafeMarkdown } from '@/components';

type SinglePostClientProps = {
  coverImageUrl: string;
  title: string;
  slug: string;
  author: string;
  createdAt: string;
  excerpt: string;
  content: string;
};

export default function SinglePost({
  coverImageUrl,
  title,
  slug,
  author,
  createdAt,
  excerpt,
  content,
}: SinglePostClientProps) {
  return (
    <article className={clsx('mb-16')}>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          src={coverImageUrl}
          width={1200}
          height={720}
          alt={title}
          className={clsx('rounded-2xl')}
        />

        <PostHeading url={`/post/${slug}`}>{title}</PostHeading>

        <p className='text-slate-700 flex gap-2'>
          {author} | <PostTimeStamp rawTimestamp={createdAt} />
        </p>

        <p className='text-xl'>{excerpt}</p>
      </header>

      <SafeMarkdown markdown={content} />
    </article>
  );
}
