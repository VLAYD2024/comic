'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useT } from '@/i18n/client';
import { LangSwitcher } from './LangSwitcher';

export function MobileMenu() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden w-10 h-10 rounded-full bg-paper/70 border border-ink/10 flex items-center justify-center hover:border-ink/30 transition"
        aria-label="Menu"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-[3px]">
          <div className="w-4 h-[2px] bg-ink rounded" />
          <div className="w-4 h-[2px] bg-ink rounded" />
          <div className="w-4 h-[2px] bg-ink rounded" />
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-paper shadow-2xl p-6 flex flex-col gap-5 animate-[slideIn_220ms_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="self-end w-9 h-9 rounded-full border border-ink/10 hover:border-ink/30 transition flex items-center justify-center text-xl leading-none -mt-1"
              aria-label="Close"
            >
              ×
            </button>

            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="font-display text-2xl font-bold tracking-tight text-ink hover:text-accent transition py-2"
              >
                {t('header.catalog')}
              </Link>
              <Link
                href="/admin"
                className="font-display text-2xl font-bold tracking-tight text-ink hover:text-accent transition py-2"
              >
                {t('header.admin')}
              </Link>
            </nav>

            <div className="pt-4 border-t border-ink/10">
              <LangSwitcher />
            </div>

            <style jsx>{`
              @keyframes slideIn {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(0);
                }
              }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
}
