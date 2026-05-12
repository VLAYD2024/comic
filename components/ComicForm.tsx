'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ImageInput } from '@/components/ImageInput';
import { useT } from '@/i18n/client';
import type { Comic, ComicPage } from '@/data/comics';

type Props = {
  initial?: Comic;
  mode: 'create' | 'edit';
};

const inputCls =
  'w-full bg-paper border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:border-accent placeholder:text-ink/40';

export function ComicForm({ initial, mode }: Props) {
  const t = useT();
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [author, setAuthor] = useState(initial?.author ?? '');
  const [year, setYear] = useState<number>(initial?.year ?? new Date().getFullYear());
  const [description, setDescription] = useState(initial?.description ?? '');
  const [cover, setCover] = useState(initial?.cover ?? '');
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(', '));
  const [pages, setPages] = useState<ComicPage[]>(initial?.pages ?? []);
  const [busy, setBusy] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bulkRef = useRef<HTMLInputElement>(null);

  function updatePage(i: number, patch: Partial<ComicPage>) {
    setPages((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function removePage(i: number) {
    setPages((prev) => prev.filter((_, idx) => idx !== i));
  }
  function movePage(i: number, dir: -1 | 1) {
    setPages((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  function addEmptyPage() {
    setPages((prev) => [...prev, { src: '' }]);
  }

  async function bulkUpload(files: FileList) {
    setBulkBusy(true);
    setError(null);
    try {
      const list = Array.from(files);
      const uploaded: ComicPage[] = [];
      for (const file of list) {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || t('form.errorGeneric'));
        uploaded.push({ src: data.url });
      }
      setPages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.errorGeneric'));
    } finally {
      setBulkBusy(false);
      if (bulkRef.current) bulkRef.current.value = '';
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const tags = tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const payload = {
        title,
        author,
        year,
        description,
        cover,
        tags,
        pages: pages.filter((p) => p.src.trim())
      };
      const url = mode === 'create' ? '/api/comics' : `/api/comics/${initial!.slug}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('form.errorGeneric'));
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.errorGeneric'));
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!initial) return;
    const confirmMessage = t('form.confirmDelete', { title: initial.title });
    if (!confirm(confirmMessage)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/comics/${initial.slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(t('form.deleteFailed'));
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.errorGeneric'));
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="grid md:grid-cols-2 gap-6 bg-paper/60 border border-ink/10 rounded-2xl p-5 shadow-card">
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">
              {t('form.title')}
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`mt-1 ${inputCls}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">
                {t('form.author')}
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">
                {t('form.year')}
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className={`mt-1 ${inputCls}`}
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">
              {t('form.description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`mt-1 ${inputCls}`}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-ink/60 font-medium">
              {t('form.tags')}
            </label>
            <input
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder={t('form.tagsPlaceholder')}
              className={`mt-1 ${inputCls}`}
            />
          </div>
        </div>

        <div>
          <ImageInput value={cover} onChange={setCover} label={t('form.cover')} />
        </div>
      </section>

      <section className="space-y-3 bg-paper/60 border border-ink/10 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {t('form.pages')} ({pages.length})
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => bulkRef.current?.click()}
              disabled={bulkBusy}
              className="px-3 py-1.5 text-sm rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition disabled:opacity-50"
            >
              {bulkBusy ? t('form.uploading') : t('form.bulkUpload')}
            </button>
            <button
              type="button"
              onClick={addEmptyPage}
              className="px-3 py-1.5 text-sm rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent transition"
            >
              {t('form.addEmpty')}
            </button>
          </div>
          <input
            ref={bulkRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) bulkUpload(e.target.files);
            }}
          />
        </div>

        {pages.length === 0 ? (
          <p className="text-ink/40 text-sm py-6 text-center border border-dashed border-ink/15 rounded-xl">
            {t('form.noPages')}
          </p>
        ) : (
          <ul className="space-y-2">
            {pages.map((p, i) => (
              <li
                key={i}
                className="flex gap-3 items-start bg-sky/60 border border-ink/10 rounded-xl p-2"
              >
                <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-mist">
                  {p.src ? (
                    <Image src={p.src} alt="" fill sizes="64px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-ink/30 text-[10px]">
                      {t('form.empty')}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink/50 w-6">#{i + 1}</span>
                    <input
                      value={p.src}
                      onChange={(e) => updatePage(i, { src: e.target.value })}
                      placeholder={t('form.pageUrl')}
                      className="flex-1 bg-paper border border-ink/15 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-accent placeholder:text-ink/40"
                    />
                  </div>
                  <input
                    value={p.caption ?? ''}
                    onChange={(e) => updatePage(i, { caption: e.target.value })}
                    placeholder={t('form.pageCaption')}
                    className="w-full bg-paper border border-ink/15 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-accent placeholder:text-ink/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => movePage(i, -1)}
                    disabled={i === 0}
                    className="text-xs w-7 h-7 rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent disabled:opacity-30"
                    aria-label={t('form.moveUp')}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => movePage(i, 1)}
                    disabled={i === pages.length - 1}
                    className="text-xs w-7 h-7 rounded-full bg-paper border border-ink/15 hover:border-accent hover:text-accent disabled:opacity-30"
                    aria-label={t('form.moveDown')}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removePage(i)}
                    className="text-xs w-7 h-7 rounded-full bg-paper border border-ink/15 hover:border-rose-400 hover:text-rose-500"
                    aria-label={t('form.deletePage')}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {error && (
        <div className="border border-rose-300 bg-rose-50 text-rose-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-ink/10">
        <button
          type="submit"
          disabled={busy}
          className="px-5 py-2 rounded-full bg-accent text-paper font-medium hover:opacity-90 transition disabled:opacity-50 shadow-card"
        >
          {busy ? t('form.saving') : mode === 'create' ? t('form.create') : t('form.save')}
        </button>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="px-4 py-2 rounded-full bg-paper border border-ink/15 hover:border-rose-400 hover:text-rose-500 transition disabled:opacity-50"
          >
            {t('form.delete')}
          </button>
        )}
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="ml-auto text-sm text-ink/60 hover:text-ink"
        >
          {t('form.cancel')}
        </button>
      </div>
    </form>
  );
}
