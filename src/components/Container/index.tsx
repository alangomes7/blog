import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div
      className={clsx(
        'bg-slate-50 min-h-screen text-slate-950',
        'max-w-screen-lg mx-auto',
      )}
    >
      {children}
    </div>
  );
}
