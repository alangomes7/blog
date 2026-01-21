import { getBrowser } from '@/lib/puppeteer';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    if (!html) {
      return new Response(JSON.stringify({ error: 'No HTML provided' }), {
        status: 400,
      });
    }

    // Load external CSS
    const cssPath = path.join(process.cwd(), 'styles', 'pdf.css');
    const cssContent = await fs.readFile(cssPath, 'utf-8');

    const browser = await getBrowser();
    const page = await browser.newPage();

    // Set content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Inject the external CSS modularly
    await page.addStyleTag({ content: cssContent });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '20mm',
        right: '20mm',
      },
      displayHeaderFooter: true, // page numbers
    });

    await browser.close();

    return new Response(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
    });
  }
}
