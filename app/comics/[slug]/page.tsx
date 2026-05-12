import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ComicReader } from '@/components/ComicReader';
import { getComic } from '@/data/store';
import { getDict } from '@/i18n/server';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const comic = await getComic(slug);
  if (!comic) return {};
  return { title: `${comic.title} — SakhaTale`, description: comic.description };
}

export default async function ComicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const comic = await getComic(slug);
  if (!comic) notFound();
  const { t } = await getDict();

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-ink/60 hover:text-ink">
        {t('comic.back')}
      </Link>

      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4 border-b border-ink/10 pb-4 sm:pb-5">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {comic.title}
          </h1>
          <p className="text-ink/60 mt-1 text-sm sm:text-base">
            {comic.author} · {comic.year}
          </p>
          <p className="text-ink/80 mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base">
            {comic.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {comic.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider bg-paper border border-ink/15 px-2 py-0.5 rounded-full text-ink/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {comic.pages.length === 0 ? (
        <p className="text-ink/50 py-10 text-center">{t('comic.noPages')}</p>
      ) : (
        <ComicReader comic={comic} />
      )}
    </div>
  );
}
