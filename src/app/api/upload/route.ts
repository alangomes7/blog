import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const filename = Date.now() + '-' + file.name.replace(/\s/g, '-');

    await writeFile(
      path.join(process.cwd(), 'public/uploads', filename),
      buffer,
    );

    // 4. Return the accessible URL
    return NextResponse.json({
      url: `/uploads/${filename}`,
      alt: file.name,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
