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

    // process.cwd() is the root of the project
    const cssPath = path.join(process.cwd(), 'src', 'styles', 'pdf.css');

    // Read the CSS file
    const cssContent = await fs.readFile(cssPath, 'utf-8');

    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
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
      displayHeaderFooter: true,
      // 1. Empty header to hide default date/title
      headerTemplate: '<div></div>',
      // 2. Footer containing only the page number logic
      footerTemplate: `
    <div style="font-size: 12px; width: 100%; text-align: center;">
      <span class="pageNumber"></span>
    </div>
  `,
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
    console.error(
      'Checked CSS Path:',
      path.join(process.cwd(), 'src', 'styles', 'pdf.css'),
    );

    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
    });
  }
}
