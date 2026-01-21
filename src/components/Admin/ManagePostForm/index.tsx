'use client';

import InputCheckbox from '@/components/InputCheckbox';
import PostEditor from '@/components/PostEditor';
type ManagePostFormProps = {};

export default function ManagePostForm({}: ManagePostFormProps) {
  return (
    <form action={''} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <PostEditor />
      </div>
    </form>
  );
}
