'use client';

import clsx from 'clsx';

type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
  reset?: () => void;
};
export default function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
  reset,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div
        className={clsx(
          'min-h-[320px] text-slate-900 border border-slate-900',
          'mb-16 p-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h1 className={clsx('text-7xl/tight mb-4 font-extrabold')}>
            {contentTitle}
          </h1>
          <div>{content}</div>
          {reset && (
            <button onClick={() => reset()} className='btn btn-primary'>
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    </>
  );
}
