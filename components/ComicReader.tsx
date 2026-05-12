'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from '@/i18n/client';
import type { Comic } from '@/data/comics';

export function ComicReader({ comic }: { comic: Comic }) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStart = useRef<number | null>(null);
  const total = comic.pages.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => {
        const next = Math.max(0, Math.min(total - 1, prev + delta));
        if (next !== prev) setDirection(delta > 0 ? 1 : -1);
        return next;
      });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const page = comic.pages[index];
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-ink/60 order-1">
          {t('reader.pageLabel')} <span className="text-ink font-medium">{index + 1}</span> / {total}
        </div>
        <div className="flex gap-2 order-2 sm:order-3 ml-auto">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-ink/15 bg-paper disabled:opacity-30 hover:border-accent hover:text-accent transition"
            aria-label={t('reader.prev')}
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            disabled={index === total - 1}
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-ink/15 bg-paper disabled:opacity-30 hover:border-accent hover:text-accent transition"
            aria-label={t('reader.next')}
          >
            →
          </button>
        </div>
        <div className="h-1 w-full sm:flex-1 sm:mx-3 bg-ink/10 rounded-full overflow-hidden order-3 sm:order-2">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className="relative bg-mist border border-ink/10 rounded-2xl overflow-hidden select-none shadow-card"
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <div className="relative w-full aspect-[3/4] md:aspect-[9/13] mx-auto max-w-2xl">
          <div
            key={index}
            className="absolute inset-0 animate-[flip_380ms_ease]"
            style={{
              animationName: 'flip',
              transformOrigin: direction === 1 ? 'left center' : 'right center'
            }}
          >
            <Image
              src={page.src}
              alt={`${comic.title} — ${t('reader.pageLabel')} ${index + 1}`}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>

          <button
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize"
            aria-label={t('reader.prevAria')}
          />
          <button
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize"
            aria-label={t('reader.nextAria')}
          />
        </div>

        {page.caption && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-paper text-ink font-display font-bold tracking-wide px-3 py-1 rounded-full border border-ink/15 shadow-card">
            {page.caption}
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto py-2">
        {comic.pages.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`relative shrink-0 w-14 h-20 rounded-lg overflow-hidden border-2 transition ${
              i === index ? 'border-accent shadow-card' : 'border-ink/10 hover:border-accent/60'
            }`}
          >
            <Image src={p.src} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes flip {
          from {
            transform: rotateY(${direction === 1 ? '-60deg' : '60deg'});
            opacity: 0;
          }
          to {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
