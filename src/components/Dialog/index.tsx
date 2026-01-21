import clsx from 'clsx';
import Button from '../button';

type DialogProps = {
  isVisible: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancell: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancell,
  disabled = true,
}: DialogProps) {
  if (!isVisible) return null;
  function handleCancell() {
    if (disabled) return;
    onCancell();
  }
  return (
    <>
      <div
        className={clsx(
          'fixed z-50 inset-0',
          'bg-black/50 backdrop-blur-xs',
          'flex items-center justify-center',
        )}
        onClick={handleCancell}
      >
        <div
          className={clsx(
            'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
            'flex flex-col gap-6',
            'shadow-lg shadow-black/30',
            'text-center',
          )}
          role='dialog'
          aria-modal={true}
          aria-labelledby='dialog-title'
          aria-describedby='dialog-description'
          onClick={e => e.stopPropagation()}
        >
          <h3 id='dialog=title' className='text-xl font-extrabold'>
            {title}
          </h3>
          <div id='dialog-description'>{content}</div>
          <div className={clsx('flex items-center justify-around')}>
            <Button
              autoFocus
              onClick={handleCancell}
              disabled={disabled}
              variant={'ghost'}
            >
              Cancelar
            </Button>
            <Button onClick={onConfirm} disabled={disabled} variant={'default'}>
              Ok
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
