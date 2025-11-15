import { postRepository } from '@/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  async () => await postRepository.findAllPublic(),
);

export const findAllPublicPostsByIdCached = cache(
  async (id: string) => await postRepository.findBySlug(id),
);

export const findAllPublicPostsBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlug(slug).catch(() => undefined);
  if (!post) notFound();
  return post;
});
