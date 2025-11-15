import { formatDatetimeTimeAgoWithSuffix } from '@/lib/utils';
import clsx from 'clsx';

type PostTimeStampProps = {
  rawTimestamp: string;
  className?: string;
};

export default function PostTimeStamp({
  rawTimestamp,
  className = 'text-sm/tight',
}: PostTimeStampProps) {
  const formatedTimestamp = formatDatetimeTimeAgoWithSuffix(rawTimestamp);

  return (
    <time
      className={clsx('text-slate-600 block', className)}
      dateTime={rawTimestamp}
    >
      {formatedTimestamp}
    </time>
  );
}
