import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ComicForm } from '@/components/ComicForm';
import { getComic } from '@/data/store';
import { getDict } from '@/i18n/server';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

export default async function EditComicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const comic = await getComic(slug);
  if (!comic) notFound();
  const { t } = await getDict();

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-ink/60 hover:text-ink">
        {t('admin.backToList')}
      </Link>
      <h1 className="font-display text-4xl font-bold tracking-tight">{comic.title}</h1>
      <p className="text-ink/50 text-sm">
        {t('admin.slugLabel')} <span className="text-ink/80 font-mono">{comic.slug}</span>
      </p>
      <ComicForm mode="edit" initial={comic} />
    </div>
  );
}
