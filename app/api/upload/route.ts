import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Файл не передан' }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: `Тип не поддерживается: ${file.type}` }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Файл больше 10 МБ' }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name).toLowerCase() || `.${file.type.split('/')[1]}`;
    const safeExt = /^\.[a-z0-9]{1,5}$/.test(ext) ? ext : '.bin';
    const id = crypto.randomBytes(8).toString('hex');
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(dir, { recursive: true });
    const filename = `${Date.now()}-${id}${safeExt}`;
    await fs.writeFile(path.join(dir, filename), buf);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ошибка загрузки';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
