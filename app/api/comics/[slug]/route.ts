import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { deleteComic, getComic, updateComic } from '@/data/store';
import type { Comic } from '@/data/comics';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { slug } = await params;
  const comic = await getComic(slug);
  if (!comic) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(comic);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const body = (await req.json()) as Partial<Comic>;
    const patch: Partial<Comic> = {};
    if (typeof body.title === 'string') patch.title = body.title.trim();
    if (typeof body.author === 'string') patch.author = body.author.trim();
    if (typeof body.cover === 'string') patch.cover = body.cover.trim();
    if (typeof body.description === 'string') patch.description = body.description.trim();
    if (body.year !== undefined) patch.year = Number(body.year) || new Date().getFullYear();
    if (Array.isArray(body.tags)) {
      patch.tags = body.tags.map((t) => String(t).trim()).filter(Boolean);
    }
    if (Array.isArray(body.pages)) {
      patch.pages = body.pages
        .filter((p) => p && typeof p.src === 'string' && p.src.trim())
        .map((p) => ({ src: p.src.trim(), caption: p.caption?.trim() || undefined }));
    }
    const updated = await updateComic(slug, patch);
    revalidatePath('/');
    revalidatePath(`/comics/${slug}`);
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ошибка';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Params }) {
  const { slug } = await params;
  await deleteComic(slug);
  revalidatePath('/');
  revalidatePath(`/comics/${slug}`);
  return NextResponse.json({ ok: true });
}
