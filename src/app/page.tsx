import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const runtime = 'edge'

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: articles = [] } = await supabase.from('article').select();
  return (
    <div>
      {articles?.map((article) => (
        <span key={article.id}>{article.title}</span>
      ))}
    </div>
  );
}
