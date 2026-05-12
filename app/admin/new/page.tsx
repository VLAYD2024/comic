import Link from 'next/link';
import { ComicForm } from '@/components/ComicForm';

export default function NewComicPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-ink/60 hover:text-ink">
        ← к списку
      </Link>
      <h1 className="font-display text-4xl font-bold tracking-tight">Новый комикс</h1>
      <ComicForm mode="create" />
    </div>
  );
}
