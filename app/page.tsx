import { CatalogView } from '@/components/CatalogView';
import { getAllTags, listComics } from '@/data/store';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [comics, tags] = await Promise.all([listComics(), getAllTags()]);
  return <CatalogView comics={comics} tags={tags} />;
}
