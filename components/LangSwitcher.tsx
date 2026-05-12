'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/i18n/client';
import { locales, type Locale } from '@/i18n/dictionaries';

const labels: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
  sah: 'SAH'
};

export function LangSwitcher() {
  const router = useRouter();
  const current = useLocale();
  const [busy, setBusy] = useState(false);

  async function change(locale: Locale) {
    if (locale === current || busy) return;
    setBusy(true);
    try {
      await fetch('/api/locale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale })
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-0.5 rounded-full bg-paper/70 border border-ink/10 p-0.5 text-[11px] font-medium">
      {locales.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            onClick={() => change(l)}
            disabled={busy}
            aria-pressed={active}
            className={`px-2 py-0.5 rounded-full transition ${
              active
                ? 'bg-accent text-paper'
                : 'text-ink/60 hover:text-ink'
            } disabled:opacity-50`}
          >
            {labels[l]}
          </button>
        );
      })}
    </div>
  );
}
