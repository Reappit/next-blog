import { type cookies } from 'next/headers';
import { createServClient } from '@/lib/supabase/server';

export async function getArticleById(
  cookieStore: ReturnType<typeof cookies>,
  id: string,
): Promise<ArticleTable | undefined> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase
    .from('article')
    .select('*, category(*)')
    .eq('short_id', id)
    .limit(1);

  return data?.[0];
}

export async function getArticles(
  cookieStore: ReturnType<typeof cookies>,
): Promise<ArticleTable[] | []> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase.from('article').select('*, category(*)');
  return data ?? [];
}
