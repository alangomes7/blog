'use server';

import {
  findAllPublicPostsBySlugCached,
  findAllPublicPostsCached,
} from '@/lib/post';
import { Metadata } from 'next';
import { SinglePost, SpinLoader } from '@/components';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * [SERVER COMPONENT FUNCTION]
 * Generates metadata for the page. This MUST remain in a server component.
 */
export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findAllPublicPostsBySlugCached(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

/**
 * [SERVER COMPONENT FUNCTION]
 * Generates static params for the page. This MUST remain in a server component.
 */
export async function generateStaticParams() {
  const posts = await findAllPublicPostsCached();
  const params = posts.map(post => {
    return {
      slug: post.slug,
    };
  });
  return params;
}

/**
 * [SERVER COMPONENT PAGE]
 * This is the main page component, which runs on the server.
 * It resolves the 'params' promise and passes the 'slug' string
 * as a prop to the new client component.
 */
export default async function PostSlugPage({ params }: PostSlugPageProps) {
  // Resolve the promise here in the server component
  const { slug } = await params;
  const post = findAllPublicPostsBySlugCached(slug);

  // Render the client component, passing the resolved post as simple prop
  return (
    <Suspense fallback={<SpinLoader className='min-20 mb-16' />}>
      <SinglePost
        coverImageUrl={(await post).coverImageUrl}
        title={(await post).title}
        slug={(await post).slug}
        author={(await post).author}
        createdAt={(await post).createdAt}
        excerpt={(await post).excerpt}
        content={(await post).content}
      />
      ;
    </Suspense>
  );
}
