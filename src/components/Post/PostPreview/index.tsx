'use client';

import clsx from 'clsx';
import PostCoverImage from '../PostCoverImage';
import PostTimeStamp from '../PostTimeStamp';
import PostHeading from '../PostHeading';
import PostDescription from '../PostDescription';

type PostPreviewProps = {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  imageCover?: boolean;
  link: {
    href: string;
  };
  postTimestamp: string;
  title: string;
  postDescription: string;
  sectionClassName?: string;
  contentClassName?: string;
  titleTag?: 'h1' | 'h2';
};

export default function PostPreview({
  image,
  imageCover = true,
  link,
  postTimestamp,
  title,
  postDescription,
  sectionClassName,
  contentClassName,
  titleTag = 'h2',
}: PostPreviewProps) {
  return (
    <section className={clsx(sectionClassName)}>
      <PostCoverImage
        imageProps={{
          width: image.width ?? 1200,
          height: image.height ?? 720,
          src: image.src,
          alt: image.alt,
        }}
        cover={imageCover}
        linkProps={{
          href: link.href,
        }}
      />
      <div className={clsx(contentClassName)}>
        <PostTimeStamp rawTimestamp={postTimestamp} />

        <PostHeading as={titleTag} url={link.href}>
          {title}
        </PostHeading>

        <PostDescription>{postDescription}</PostDescription>
      </div>
    </section>
  );
}
