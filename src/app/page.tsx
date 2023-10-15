import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '@/components/Header';

export const runtime = 'edge';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: articles = [] } = await supabase.from('article').select();
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        {articles?.map((article) => (
          <span key={article.id}>{article.title}</span>
        ))}
      </div>
    </div>
  );
}
