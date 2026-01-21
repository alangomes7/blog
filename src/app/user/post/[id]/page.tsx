export const dynamic = 'force-dynamic';

type UserPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserPostIdPage({ params }: UserPostIdPageProps) {
  const { id } = await params;
  return (
    <>
      <div className='py-16 text-6xl'>
        <h1>Post id Page : {id}</h1>
      </div>
    </>
  );
}
