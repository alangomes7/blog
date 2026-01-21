'use server';
import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { logColor } from '@/utils/logger-color';
import { simulateWait } from '@/utils/simulate-wait';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export default async function deletePostAction(id: string) {
  // TODO: login do usuario

  // TODO: remover 2 linhas abaixo
  await simulateWait(2000, true);
  logColor('delete post' + id);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }
  const post = await postRepository.findById(id).catch(() => undefined);
  if (!post) {
    return {
      error: 'Post não existente!',
    };
  }

  // TODO: mover este método para o repositório
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  // TODO: revalidadeTag or revalidadePath
  revalidateTag('posts', '');
  revalidateTag(`post-${post.slug}`, '');

  return {
    error: '',
  };
}
