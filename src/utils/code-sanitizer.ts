import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkStripHtml from 'remark-strip-html';
import DOMPurify from 'dompurify';

/**
 * Sanitizes MARKDOWN by stripping raw HTML.
 * Safe, synchronous, React-friendly.
 */
export function sanitizeMarkdown(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkStripHtml) // 🔥 removes <script>, <iframe>, etc
    .use(remarkStringify)
    .processSync(markdown);

  return String(file);
}

/**
 * Sanitizes HTML output (for preview / PDF).
 * Client-side only.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}
