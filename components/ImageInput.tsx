'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useT } from '@/i18n/client';

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspect?: string;
};

export function ImageInput({ value, onChange, label, aspect = 'aspect-[3/4]' }: Props) {
  const t = useT();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('form.errorGeneric'));
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.errorGeneric'));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">
        {label ?? t('form.cover')}
      </label>
      <div className="flex gap-3 items-start">
        <div
          className={`relative ${aspect} w-28 shrink-0 rounded-xl border border-ink/15 overflow-hidden bg-mist`}
        >
          {value ? (
            <Image src={value} alt="" fill sizes="112px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-ink/30 text-xs">
              {t('form.none')}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t('form.imagePlaceholder')}
            className="w-full bg-paper border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-ink/40"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition disabled:opacity-50"
            >
              {busy ? t('form.uploading') : t('form.uploadFile')}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-paper border border-ink/15 hover:border-rose-400 hover:text-rose-500 transition"
              >
                {t('form.clear')}
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
            }}
          />
          {error && <p className="text-xs text-rose-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
