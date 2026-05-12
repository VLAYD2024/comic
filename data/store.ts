import { promises as fs } from 'fs';
import path from 'path';
import type { Comic } from './comics';

const DATA_FILE = path.join(process.cwd(), 'data', 'comics.json');

async function readAll(): Promise<Comic[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Comic[];
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

async function writeAll(comics: Comic[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(comics, null, 2), 'utf-8');
}

export async function listComics(): Promise<Comic[]> {
  return readAll();
}

export async function getComic(slug: string): Promise<Comic | undefined> {
  const all = await readAll();
  return all.find((c) => c.slug === slug);
}

export async function getAllTags(): Promise<string[]> {
  const all = await readAll();
  return Array.from(new Set(all.flatMap((c) => c.tags))).sort();
}

const RESERVED_SLUGS = new Set(['new', 'edit', 'admin', 'api', '_next']);

export async function addComic(comic: Comic): Promise<void> {
  const all = await readAll();
  if (RESERVED_SLUGS.has(comic.slug)) {
    throw new Error(`Slug "${comic.slug}" зарезервирован, выбери другой`);
  }
  if (all.some((c) => c.slug === comic.slug)) {
    throw new Error(`Комикс с slug "${comic.slug}" уже существует`);
  }
  all.unshift(comic);
  await writeAll(all);
}

export async function updateComic(slug: string, patch: Partial<Comic>): Promise<Comic> {
  const all = await readAll();
  const idx = all.findIndex((c) => c.slug === slug);
  if (idx === -1) throw new Error('Комикс не найден');
  if (patch.slug && patch.slug !== slug && all.some((c) => c.slug === patch.slug)) {
    throw new Error(`Комикс с slug "${patch.slug}" уже существует`);
  }
  all[idx] = { ...all[idx], ...patch };
  await writeAll(all);
  return all[idx];
}

export async function deleteComic(slug: string): Promise<void> {
  const all = await readAll();
  const next = all.filter((c) => c.slug !== slug);
  await writeAll(next);
}

export function slugify(input: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
  };
  return input
    .toLowerCase()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || `comic-${Date.now()}`;
}
