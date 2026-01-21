import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export default function InputCheckbox({
  labelText = '',
  type,
  ...props
}: InputCheckboxProps) {
  const id = useId();
  return (
    <div className='flex flex-row  items-center gap-3'>
      <input
        {...props}
        className={clsx(
          'w-4 h-4 accent-blue-600 ring-1 focus:ring-2 focus:ring-blue-600',
          props.className,
        )}
        id={id}
        type={type}
      />
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
