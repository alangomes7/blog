import MenuAdmin from '@/components/Admin/MenuAdmin';

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
