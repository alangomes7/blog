import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
  cover?: boolean;
};

export default function PostCoverImage({
  imageProps,
  cover = true,
  linkProps,
}: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        'relative block w-full overflow-hidden rounded-xl',
        'transition-transform duration-300 ease-out hover:scale-[1.02]',
        cover ? 'aspect-square sm:h-64' : 'aspect-video',
        linkProps.className,
      )}
    >
      <Image
        src={imageProps.src}
        alt={imageProps.alt}
        fill
        sizes={
          imageProps.sizes ||
          '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        }
        className={clsx(
          'w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105',
          imageProps.className,
        )}
        priority
      />
    </Link>
  );
}
