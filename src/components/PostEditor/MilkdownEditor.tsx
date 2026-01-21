'use client';

import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  type ForwardedRef,
} from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

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

  // Expose methods to the parent via ref
  useImperativeHandle(ref, () => ({
    getMarkdown: () => {
      return crepeRef.current ? crepeRef.current.getMarkdown() : '';
    },
  }));

  useEffect(() => {
    if (!editorRef.current || crepeRef.current) return;

    const crepe = new Crepe({
      root: editorRef.current,
      defaultValue: defaultValue,
    });

    // Set editable/readonly state
    crepe.setReadonly(readOnly);

    crepeRef.current = crepe;
    crepe.create();

    return () => {
      crepeRef.current?.destroy();
      crepeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={editorRef}
      className='milkdown-container'
      style={{ minHeight: '100%', height: '100%' }}
    />
  );
}

const MilkdownEditor = forwardRef(MilkdownEditorImplementation);
MilkdownEditor.displayName = 'MilkdownEditor';

export default MilkdownEditor;
