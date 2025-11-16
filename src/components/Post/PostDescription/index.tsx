'use client';

type PostDescriptionProps = {
  children: React.ReactNode;
};

export default function PostDescription({ children }: PostDescriptionProps) {
  return (
    <p className='text-slate-700 text-sm line-clamp-3 leading-snug'>
      {children}
    </p>
  );
}
