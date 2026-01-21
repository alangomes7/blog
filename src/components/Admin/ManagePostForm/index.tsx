'use client';

import InputCheckbox from '@/components/InputCheckbox';
import InputText from '@/components/InputText';
import PostEditor from '@/components/PostEditor';
import ImageUploader from '../ImageUploader';
type ManagePostFormProps = {};

export default function ManagePostForm({}: ManagePostFormProps) {
  return (
    <form action={''} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText />
        <InputCheckbox labelText='Publicado' />
        <ImageUploader />
        <PostEditor />
      </div>
    </form>
  );
}
