'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ComicCard } from '@/components/ComicCard';
import { TagFilter } from '@/components/TagFilter';
import type { Comic } from '@/data/comics';

type Props = {
  comics: Comic[];
  tags: string[];
};

export function CatalogView({ comics, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return comics.filter((c) => {
      const tagOk = !activeTag || c.tags.includes(activeTag);
      const qOk =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return tagOk && qOk;
    });
  }, [activeTag, query, comics]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-3">
        <h1 className="font-display text-5xl md:text-6xl tracking-tight font-bold">
          Сборник <span className="text-accent">комиксов</span>
        </h1>
        <p className="text-ink/60 max-w-2xl">
          Выбирай по настроению, листай страницы стрелками, кликом или свайпом.
        </p>
      </section>

      {comics.length === 0 ? (
        <section className="text-center py-16 bg-paper/60 border border-ink/10 rounded-2xl shadow-card">
          <p className="text-ink/60 mb-4">Пока ни одного комикса.</p>
          <Link
            href="/admin"
            className="inline-block px-4 py-2 rounded-full bg-accent text-paper font-medium hover:opacity-90 transition shadow-card"
          >
            Добавить первый →
          </Link>
        </section>
      ) : (
        <>
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TagFilter tags={tags} active={activeTag} onChange={setActiveTag} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию или автору…"
              className="bg-paper border border-ink/15 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent w-full md:w-64 placeholder:text-ink/40"
            />
          </section>

          {filtered.length === 0 ? (
            <p className="text-ink/50 py-10 text-center">Ничего не нашлось.</p>
          ) : (
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((c) => (
                <ComicCard key={c.slug} comic={c} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
