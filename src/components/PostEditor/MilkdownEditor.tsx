'use client';

import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  type ForwardedRef,
} from 'react';
import { Crepe } from '@milkdown/crepe';
import { upload, uploadConfig } from '@milkdown/plugin-upload';
import { Decoration } from 'prosemirror-view';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';
import clsx from 'clsx';
import '@/styles/milkdown-overrides.css';

interface MilkdownEditorProps {
  defaultValue?: string;
  readOnly?: boolean;
}

export interface MilkdownRef {
  getMarkdown: () => string;
}

function MilkdownEditorImplementation(
  { defaultValue = '', readOnly = false }: MilkdownEditorProps,
  ref: ForwardedRef<MilkdownRef>,
) {
  const editorRef = useRef<HTMLDivElement>(null);
  const crepeRef = useRef<Crepe | null>(null);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => crepeRef.current?.getMarkdown() ?? '',
  }));

  useEffect(() => {
    if (!editorRef.current || crepeRef.current) return;

    const crepe = new Crepe({
      root: editorRef.current,
      defaultValue,
    });

    crepe.editor.use(upload);

    crepe.editor.config(ctx => {
      ctx.set(uploadConfig.key, {
        enableHtmlFileUploader: true,

        uploadWidgetFactory: (pos, spec) => {
          const el = document.createElement('div');
          el.className = 'milkdown-upload-widget';
          el.innerText = 'Uploading...';
          return Decoration.widget(pos, el, spec);
        },

        uploader: async (files, schema) => {
          const fileArray = Array.from(files);

          return Promise.all(
            fileArray.map(async file => {
              const formData = new FormData();
              formData.append('file', file);

              const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });

              if (!response.ok) {
                throw new Error('Upload failed');
              }

              const data = await response.json();

              return schema.nodes.image.create({
                src: data.url,
                alt: data.alt ?? file.name,
                title: file.name,
              });
            }),
          );
        },
      });
    });

    crepe.create();
    crepeRef.current = crepe;

    return () => {
      crepe.destroy();
      crepeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!crepeRef.current) return;
    crepeRef.current.setReadonly(readOnly);
  }, [readOnly]);

  return (
    <div className='relative w-full h-full'>
      <div
        ref={editorRef}
        className={clsx('milkdown-container', 'milkdown-overrides')}
        style={{ minHeight: '100%', height: '100%' }}
      />
    </div>
  );
}

const MilkdownEditor = forwardRef(MilkdownEditorImplementation);
MilkdownEditor.displayName = 'MilkdownEditor';

export default MilkdownEditor;
