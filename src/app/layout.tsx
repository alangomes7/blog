import type { Metadata } from 'next';
import './globals.css';
import { MainTemplate } from '@/templates';

export const metadata: Metadata = {
  title: {
    default: 'The Blog',
    template: '% | The Blog',
  },
  description: 'This is the blog',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <body>
        <MainTemplate>{children}</MainTemplate>
      </body>
    </html>
  );
}
