import ManagePostForm from '@/components/Admin/ManagePostForm';

export const dynamic = 'force-dynamic';

type UserPostNewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserPostNewPage({
  params,
}: UserPostNewPageProps) {
  return (
    <>
      <h1>Criar post</h1>
      <ManagePostForm />
    </>
  );
}
