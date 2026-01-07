'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Footer() {
  // 1. Initialize with null to match the server's initial render
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // 2. This only runs in the browser
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className='pb-16 text-center'>
      <p>
        <span>
          {/* 3. Show a placeholder or empty string during hydration */}
          Copyright &copy; {year ?? '...'} -
        </span>
        <Link href='/'>The Blog</Link>
      </p>
    </footer>
  );
}
