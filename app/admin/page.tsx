import Image from 'next/image';
import Link from 'next/link';
import { listComics } from '@/data/store';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const comics = await listComics();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Админка</h1>
          <p className="text-ink/50 text-sm mt-1">
            Без авторизации. Просто добавляй, редактируй и удаляй.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="px-4 py-2 rounded-full bg-accent text-paper font-medium hover:opacity-90 transition shadow-card"
        >
          + Новый комикс
        </Link>
      </header>

      {comics.length === 0 ? (
        <div className="text-center py-16 bg-paper/60 border border-ink/10 rounded-2xl shadow-card">
          <p className="text-ink/60 mb-4">Ни одного комикса.</p>
          <Link
            href="/admin/new"
            className="inline-block px-4 py-2 rounded-full bg-accent text-paper font-medium hover:opacity-90 transition shadow-card"
          >
            Создать первый →
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-ink/10 bg-paper/60 border border-ink/10 rounded-2xl overflow-hidden shadow-card">
          {comics.map((c) => (
            <li key={c.slug} className="flex items-center gap-4 p-3 hover:bg-sky/60 transition">
              <div className="relative w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-mist border border-ink/10">
                {c.cover && (
                  <Image src={c.cover} alt="" fill sizes="48px" className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg font-bold truncate">
                  {c.title || '— без названия —'}
                </div>
                <div className="text-xs text-ink/50 truncate">
                  {c.author || '—'} · {c.year} · {c.pages.length} стр · {c.tags.length} тегов
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/comics/${c.slug}`}
                  className="text-sm px-3 py-1 rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition"
                >
                  Открыть
                </Link>
                <Link
                  href={`/admin/edit/${c.slug}`}
                  className="text-sm px-3 py-1 rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition"
                >
                  Править
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
