'use client';

import { useState, useRef, useEffect } from 'react';
import MilkdownEditor, { type MilkdownRef } from './MilkdownEditor';
import { sanitizeHtml, sanitizeMarkdown } from '@/utils/code-sanitizer';

type ViewMode = 'raw' | 'web' | 'print';

export default function PostEditor() {
  const [viewMode, setViewMode] = useState<ViewMode>('raw');
  const [content, setContent] = useState(
    '# Hello World\n\nWrite your raw markdown here...',
  );

  // PDF Preview State
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const milkdownRef = useRef<MilkdownRef>(null);

  // --- Effect: Auto-generate PDF when switching to Print Mode ---
  useEffect(() => {
    let isMounted = true;

    const generatePdfPreview = async () => {
      if (viewMode !== 'print') return;

      try {
        setIsLoadingPdf(true);
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);

        // Small delay to allow render
        await new Promise(resolve => setTimeout(resolve, 300));

        const element = document.querySelector(
          '.milkdown-container .ProseMirror',
        );
        if (!element) {
          throw new Error('Editor content not found for PDF generation');
        }

        // 1. Sanitize the Rendered HTML before sending to API (RENDER TIME)
        const cleanHtml = sanitizeHtml(element.innerHTML);

        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: cleanHtml }),
        });

        if (!response.ok)
          throw new Error('PDF generation failed' + response.text());

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        if (isMounted) {
          setPdfUrl(url);
        } else {
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Preview Error:', error);
      } finally {
        if (isMounted) setIsLoadingPdf(false);
      }
    };

    generatePdfPreview();

    return () => {
      isMounted = false;
    };
  }, [viewMode]);

  const handleTabChange = (newMode: ViewMode) => {
    // 2. Logic when LEAVING 'web' or 'print' mode back to 'raw'
    if (viewMode !== 'raw' && newMode === 'raw' && milkdownRef.current) {
      const currentMarkdown = milkdownRef.current.getMarkdown();
      setContent(currentMarkdown);
    }
    setViewMode(newMode);
  };

  // Inside PostEditor.tsx

  const handleSave = async () => {
    let contentToSave = content;

    // 1. Get the latest markdown from the editor
    if (viewMode !== 'raw' && milkdownRef.current) {
      contentToSave = milkdownRef.current.getMarkdown();
    }

    // 2. Sanitize
    const cleanContent = sanitizeMarkdown(contentToSave);

    // 3. Send to Server (Example)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: cleanContent,
          // title: titleState, // if you have a title
          // date: new Date(),
        }),
      });

      if (response.ok) {
        alert('Post saved successfully!');
        setContent(cleanContent);
      } else {
        alert('Error saving post');
      }
    } catch (e) {
      console.error(e);
      alert('Network error');
    }
  };

  const handleDownloadPdf = async () => {
    if (viewMode === 'print' && pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const element = document.querySelector('.milkdown-container .ProseMirror');
    if (!element) return;

    try {
      setIsLoadingPdf(true);

      // 4. Sanitize HTML for manual download (RENDER TIME)
      const cleanHtml = sanitizeHtml(element.innerHTML);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: cleanHtml }),
      });

      if (!response.ok) throw new Error('PDF generation failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF');
    } finally {
      setIsLoadingPdf(false);
    }
  };

  return (
    <div className='w-full max-w-6xl mx-auto my-2 md:my-8 flex flex-col h-[90vh] md:h-[85vh]'>
      <div className='flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-2 md:px-4 md:py-3 bg-white border border-gray-200 rounded-t-lg shadow-sm z-10'>
        {/* View Mode Toggles */}
        <div className='flex justify-center md:justify-start bg-gray-100 p-1 rounded-lg border border-gray-200'>
          <button
            type='button'
            onClick={() => handleTabChange('raw')}
            className={`flex-1 md:flex-none px-3 py-1.5 md:px-4 text-xs md:text-sm font-medium rounded-md transition-all ${
              viewMode === 'raw'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Texto
          </button>
          <button
            type='button'
            onClick={() => handleTabChange('web')}
            className={`flex-1 md:flex-none px-3 py-1.5 md:px-4 text-xs md:text-sm font-medium rounded-md transition-all ${
              viewMode === 'web'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Prévia
          </button>
          <button
            type='button'
            onClick={() => handleTabChange('print')}
            className={`flex-1 md:flex-none px-3 py-1.5 md:px-4 text-xs md:text-sm font-medium rounded-md transition-all ${
              viewMode === 'print'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Versão PDF
          </button>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2 items-center justify-end'>
          {viewMode === 'print' && (
            <button
              type='button'
              onClick={handleDownloadPdf}
              disabled={isLoadingPdf}
              className='flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50'
            >
              {isLoadingPdf ? 'Gerando...' : 'Exportar PDF'}
            </button>
          )}

          <button
            type='button'
            onClick={handleSave}
            className='px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors'
          >
            Save
          </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div
        className={`
        flex-1 overflow-hidden border border-t-0 border-gray-200 rounded-b-lg relative
        ${viewMode === 'print' ? 'bg-gray-800' : 'bg-white'}
      `}
      >
        {viewMode === 'raw' && (
          <textarea
            className='w-full h-full p-4 md:p-6 resize-none outline-none font-mono text-sm text-gray-800 bg-white'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='# Start typing...'
            spellCheck={false}
          />
        )}

        {viewMode !== 'raw' && (
          <>
            <div
              className={`h-full overflow-y-auto w-full transition-all duration-300 ${
                viewMode === 'print'
                  ? 'absolute top-0 left-0 opacity-0 pointer-events-none -z-10'
                  : 'block'
              }`}
            >
              <div className='max-w-4xl min-h-full w-full px-4 py-4 md:px-8 md:py-8 mx-auto overflow-x-auto'>
                <MilkdownEditor
                  ref={milkdownRef}
                  key='editor-instance'
                  defaultValue={content}
                  readOnly={false}
                />
              </div>
            </div>

            {viewMode === 'print' && (
              <div className='w-full h-full flex items-center justify-center'>
                {isLoadingPdf ? (
                  <div className='text-white flex flex-col items-center gap-2'>
                    <div className='w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin'></div>
                    <p className='text-sm font-medium'>
                      Gerando visualização PDF...
                    </p>
                  </div>
                ) : pdfUrl ? (
                  <iframe
                    src={`${pdfUrl}#toolbar=0&view=FitH`}
                    className='w-full h-full border-none'
                    title='PDF Preview'
                  />
                ) : (
                  <div className='text-white/70'>
                    Falha ao carregar preview.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
