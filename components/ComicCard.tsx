import Image from 'next/image';
import Link from 'next/link';
import type { Comic } from '@/data/comics';

export function ComicCard({ comic }: { comic: Comic }) {
  return (
    <Link
      href={`/comics/${comic.slug}`}
      className="group block bg-paper text-ink border border-ink/10 rounded-2xl overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-1 transition"
    >
      <div className="relative aspect-[3/4] overflow-hidden border-b border-ink/5 bg-mist">
        {comic.cover ? (
          <Image
            src={comic.cover}
            alt={comic.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-ink/30 font-display text-xl">
            нет обложки
          </div>
        )}
        <span className="absolute top-2 left-2 bg-accent text-paper font-display text-xs tracking-wide px-2 py-0.5 rounded-full shadow-card">
          {comic.year}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-display text-xl leading-tight font-bold">{comic.title}</h3>
        <p className="text-xs text-ink/60 mb-2">{comic.author}</p>
        <div className="flex flex-wrap gap-1">
          {comic.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider bg-sky text-ink/70 px-1.5 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
