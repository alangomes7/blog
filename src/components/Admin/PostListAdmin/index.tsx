import ErrorMessage from '@/components/ErrorMessage';
import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import DeletePostButton from '../deletePostButton';

export default async function PostListsAdmin() {
  const posts = await findAllPostsAdmin();
  if (posts.length <= 0) {
    return <ErrorMessage contentTitle={'Ops'} content={'Nenhum post criado'} />;
  }
  return (
    <>
      <div className='mb-16'>
        {posts.map(post => {
          return (
            <div
              key={post.id}
              className={clsx(
                'p-2',
                !post.published && 'bg-slate-300',
                'flex gap-2 items-center justify-between',
              )}
            >
              <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
              {!post.published && (
                <span className='text-xs text-slate-600 italic'>
                  {' '}
                  (Não publicado)
                </span>
              )}
              <DeletePostButton id={post.id} title={post.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}
