'use server';

import { PostPreview } from '@/components';
import { findAllPublicPostsCached } from '@/lib/post';

export default async function PostList() {
  const posts = await findAllPublicPostsCached();

  return (
    <div className='grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => (
        <PostPreview
          key={post.id}
          image={{
            src: post.coverImageUrl,
            alt: post.title,
          }}
          imageCover={false}
          link={{
            href: `/post/${post.slug}`,
          }}
          postTimestamp={post.createdAt}
          title={post.title}
          sectionClassName='flex flex-col gap-4 group h-full'
          contentClassName='flex flex-col gap-3 sm:justify-between flex-1'
          postDescription={post.excerpt}
        />
      ))}
    </div>
  );
}
