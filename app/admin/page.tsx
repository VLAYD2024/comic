import Image from 'next/image';
import Link from 'next/link';
import { listComics } from '@/data/store';
import { getDict } from '@/i18n/server';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const comics = await listComics();
  const { t } = await getDict();

  return (
    <div className="space-y-6">
      <header className="flex items-start sm:items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {t('admin.title')}
          </h1>
          <p className="text-ink/50 text-sm mt-1">{t('admin.subtitle')}</p>
        </div>
        <Link
          href="/admin/new"
          className="px-4 py-2 rounded-full bg-accent text-paper font-medium hover:opacity-90 transition shadow-card text-sm sm:text-base whitespace-nowrap"
        >
          {t('admin.newComic')}
        </Link>
      </header>

      {comics.length === 0 ? (
        <div className="text-center py-16 bg-paper/60 border border-ink/10 rounded-2xl shadow-card">
          <p className="text-ink/60 mb-4">{t('admin.empty')}</p>
          <Link
            href="/admin/new"
            className="inline-block px-4 py-2 rounded-full bg-accent text-paper font-medium hover:opacity-90 transition shadow-card"
          >
            {t('admin.createFirst')}
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-ink/10 bg-paper/60 border border-ink/10 rounded-2xl overflow-hidden shadow-card">
          {comics.map((c) => (
            <li
              key={c.slug}
              className="flex items-center gap-3 sm:gap-4 p-3 hover:bg-sky/60 transition"
            >
              <div className="relative w-10 h-14 sm:w-12 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-mist border border-ink/10">
                {c.cover && (
                  <Image src={c.cover} alt="" fill sizes="48px" className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-base sm:text-lg font-bold truncate">
                  {c.title || t('admin.untitled')}
                </div>
                <div className="text-[11px] sm:text-xs text-ink/50 truncate">
                  {c.author || '—'} · {c.year} · {c.pages.length} {t('admin.pagesShort')} ·{' '}
                  {c.tags.length} {t('admin.tagsShort')}
                </div>
              </div>
              <div className="flex gap-1.5 sm:gap-2 shrink-0">
                <Link
                  href={`/comics/${c.slug}`}
                  className="text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition"
                >
                  {t('admin.open')}
                </Link>
                <Link
                  href={`/admin/edit/${c.slug}`}
                  className="text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition"
                >
                  {t('admin.edit')}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
