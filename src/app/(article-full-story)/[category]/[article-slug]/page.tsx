import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default async function ArticlePage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<DB>({
    cookies: () => cookieStore,
  });
  const router = useRouter();
  console.log(router);
  const { data: article } = await supabase
    .from('article')
    .select('*, category(*)')
    .eq('uuid', '')
    .limit(1);

  return <div>{article?.[0].full_story}</div>;
}
