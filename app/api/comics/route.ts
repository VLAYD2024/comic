import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { addComic, listComics, slugify } from '@/data/store';
import type { Comic } from '@/data/comics';

export const dynamic = 'force-dynamic';

export async function GET() {
  const comics = await listComics();
  return NextResponse.json(comics);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Comic>;
    if (!body.title?.trim()) {
      return NextResponse.json({ error: 'Название обязательно' }, { status: 400 });
    }
    const slug = body.slug?.trim() || slugify(body.title);
    const comic: Comic = {
      slug,
      title: body.title.trim(),
      author: body.author?.trim() ?? '',
      cover: body.cover?.trim() ?? '',
      year: Number(body.year) || new Date().getFullYear(),
      description: body.description?.trim() ?? '',
      tags: Array.isArray(body.tags)
        ? body.tags.map((t) => String(t).trim()).filter(Boolean)
        : [],
      pages: Array.isArray(body.pages)
        ? body.pages
            .filter((p) => p && typeof p.src === 'string' && p.src.trim())
            .map((p) => ({ src: p.src.trim(), caption: p.caption?.trim() || undefined }))
        : []
    };
    await addComic(comic);
    revalidatePath('/');
    revalidatePath(`/comics/${slug}`);
    return NextResponse.json(comic, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ошибка';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
