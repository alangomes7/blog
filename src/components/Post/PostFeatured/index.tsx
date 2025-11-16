'use server';

import { PostPreview } from '@/components';
import { findAllPublicPostsCached } from '@/lib/post';
type PostFeaturedProps = {
  sectionClassName?: string;
  contentClassName?: string;
};

export default async function PostFeatured({
  sectionClassName = 'grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16 items-stretch group',
  contentClassName = 'flex flex-col justify-start flex-1 gap-4',
}: PostFeaturedProps) {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];
  return (
    <PostPreview
      image={{
        src: post.coverImageUrl,
        alt: post.title,
      }}
      link={{
        href: `/post/${post.slug}`,
      }}
      postTimestamp={post.createdAt}
      title={post.title}
      titleTag={'h1'}
      sectionClassName={sectionClassName}
      contentClassName={contentClassName}
      postDescription={post.excerpt}
    />
  );
}
