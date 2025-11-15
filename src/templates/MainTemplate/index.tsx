import { Header, Container, Footer } from '@/components';

type MainTemplateProps = {
  children: React.ReactNode;
};

export default function MainTemplate({ children }: MainTemplateProps) {
  return (
    <div className='bg-slate-50 p-4'>
      <Header text={'The Blog'} link={'/'} />
      <Container>{children}</Container>
      <Footer text={''} />
    </div>
  );
}
