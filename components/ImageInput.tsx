'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspect?: string;
};

export function ImageInput({ value, onChange, label = 'Изображение', aspect = 'aspect-[3/4]' }: Props) {
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
      if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">{label}</label>
      <div className="flex gap-3 items-start">
        <div
          className={`relative ${aspect} w-28 shrink-0 rounded-xl border border-ink/15 overflow-hidden bg-mist`}
        >
          {value ? (
            <Image src={value} alt="" fill sizes="112px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-ink/30 text-xs">
              нет
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL или /uploads/…"
            className="w-full bg-paper border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-ink/40"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="px-3 py-1.5 text-sm rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition disabled:opacity-50"
            >
              {busy ? 'Загрузка…' : 'Загрузить файл'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 text-sm rounded-full bg-paper border border-ink/15 hover:border-rose-400 hover:text-rose-500 transition"
              >
                Очистить
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
