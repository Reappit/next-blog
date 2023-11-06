import { cookies } from 'next/headers';
import Article from '@/components/Article';
import { getArticles } from '@/repository/article-repository';

export const runtime = 'edge';

export default async function Articles() {
  const cookieStore = cookies();
  const articles = await getArticles(cookieStore);

  return articles?.map((article, index) => (
    <Article article={article} key={article.short_id} first={index === 0} />
  ));
}
