import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Blog',
  description: 'This is the blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <header>
          <h1>The Blog</h1>
        </header>

        {children}
        <footer>
          <h1>Footer</h1>
        </footer>
      </body>
    </html>
  );
}
