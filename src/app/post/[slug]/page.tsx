import { SpinLoader, SinglePost } from '@/components';
import { findAllPublicPostsBySlugCached } from '@/lib/post';
import clsx from 'clsx';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetada({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findAllPublicPostsBySlugCached(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}
export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
