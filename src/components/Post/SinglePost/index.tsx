import { findAllPublicPostsBySlugCached } from '@/lib/post';
import clsx from 'clsx';
import Image from 'next/image';
import { PostHeading, PostTimeStamp, SafeMarkdown } from '@/components';

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findAllPublicPostsBySlugCached(slug);
  return (
    <article className={clsx('mb-16')}>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          className={clsx('rounded-2xl')}
        />

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p className={clsx('text-slate-700')}>
          {post.author} |
          <PostTimeStamp rawTimestamp={post.createdAt} />
        </p>
        <p className={clsx('text-xl')}>{post.excerpt}</p>
      </header>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
