import Link from 'next/link';
import { ComicForm } from '@/components/ComicForm';
import { getDict } from '@/i18n/server';

export default async function NewComicPage() {
  const { t } = await getDict();
  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-ink/60 hover:text-ink">
        {t('admin.backToList')}
      </Link>
      <h1 className="font-display text-4xl font-bold tracking-tight">{t('admin.newPageTitle')}</h1>
      <ComicForm mode="create" />
    </div>
  );
}
