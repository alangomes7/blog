'use client';

import { useState, useRef, useEffect } from 'react';
import MilkdownEditor, { type MilkdownRef } from './MilkdownEditor';

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
      // Only run this if we are in print mode
      if (viewMode !== 'print') return;

      try {
        setIsLoadingPdf(true);
        // Clean up previous URL to avoid memory leaks
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);

        // Small delay to ensure MilkdownEditor is mounted/rendered in the DOM
        // (especially if coming from 'raw' mode)
        await new Promise(resolve => setTimeout(resolve, 300));

        const element = document.querySelector(
          '.milkdown-container .ProseMirror',
        );
        if (!element) {
          throw new Error('Editor content not found for PDF generation');
        }

        const response = await fetch('src/api/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: element.innerHTML }),
        });

        if (!response.ok) throw new Error('PDF generation failed');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  const handleTabChange = (newMode: ViewMode) => {
    // Sync Raw -> Content before switching
    if (viewMode !== 'raw' && newMode === 'raw' && milkdownRef.current) {
      const currentMarkdown = milkdownRef.current.getMarkdown();
      setContent(currentMarkdown);
    }
    setViewMode(newMode);
  };

  const handleSave = () => {
    let contentToSave = content;
    if (viewMode !== 'raw' && milkdownRef.current) {
      contentToSave = milkdownRef.current.getMarkdown();
      setContent(contentToSave);
    }
    console.log('Saving:', contentToSave);
    alert(`Saved! (${contentToSave.length} chars)`);
  };

  // Optimized Download: Uses existing Blob if available, else generates new one
  const handleDownloadPdf = async () => {
    // If we already have the PDF preview loaded, just download that blob
    if (viewMode === 'print' && pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Fallback: Generate from scratch (e.g. if called from Web view directly)
    const element = document.querySelector('.milkdown-container .ProseMirror');
    if (!element) return;

    try {
      setIsLoadingPdf(true); // Re-use the loading state for UI feedback
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: element.innerHTML }),
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
    <div className='w-full max-w-6xl mx-auto my-8 flex flex-col h-[85vh]'>
      {/* --- HEADER / TABS --- */}
      <div className='flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-t-lg shadow-sm z-10'>
        <div className='flex bg-gray-100 p-1 rounded-lg border border-gray-200'>
          <button
            type='button'
            onClick={() => handleTabChange('raw')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
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
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
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
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              viewMode === 'print'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Versão PDF
          </button>
        </div>

        <div className='flex gap-3 items-center'>
          {viewMode === 'print' && (
            <button
              type='button'
              onClick={handleDownloadPdf}
              disabled={isLoadingPdf}
              className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50'
            >
              {isLoadingPdf ? 'Gerando...' : 'Exportar PDF'}
            </button>
          )}

          <button
            type='button'
            onClick={handleSave}
            className='px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors'
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
            className='w-full h-full p-6 resize-none outline-none font-mono text-sm text-gray-800 bg-white'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='# Start typing...'
            spellCheck={false}
          />
        )}

        {/* We render the editor for both 'web' and 'print' modes.
          In 'print' mode, we hide it visually but keep it in DOM so we can scrape the HTML for the backend.
        */}
        {viewMode !== 'raw' && (
          <>
            <div
              className={`h-full overflow-y-auto w-full transition-all duration-300 ${
                viewMode === 'print' ? 'hidden' : 'block'
              }`}
            >
              <div className='max-w-4xl min-h-full px-8 py-8 mx-auto'>
                <MilkdownEditor
                  ref={milkdownRef}
                  key='editor-instance'
                  defaultValue={content}
                  readOnly={false}
                />
              </div>
            </div>

            {/* The Actual PDF Preview Iframe */}
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
                    src={`${pdfUrl}#toolbar=0&view=FitH`} // PDF viewer params
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
