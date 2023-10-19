import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<DB>({
    cookies: () => cookieStore,
  });
  const articleShortId = slug.split('-').at(-1) ?? '';
  const { data: article } = await supabase
    .from('article')
    .select('*, category(*)')
    .eq('short_id', articleShortId)
    .limit(1);

  return <div>{article?.[0].full_story}</div>;
}
