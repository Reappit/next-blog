import { cookies } from 'next/headers';
import Article from '@/components/Article';
import { createServerClient } from '@supabase/ssr';

export const runtime = 'edge';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
  const { data: articles = [] } = await supabase
    .from('article')
    .select('*, category(*)');
  return (
    <div className="flex flex-row justify-evenly">
      <main className="md:min-w-[728px] md:max-w-[728px] lg:min-w-[728px] lg:max-w-[728px]">
        {articles?.map((article, index) => (
          <Article
            article={article}
            key={article.short_id}
            first={index === 0}
          />
        ))}
      </main>
      <div className="hidden min-h-[100vh] border-l md:min-w-[300px] md:max-w-[368px] lg:block">
        <div className="mt-10 pl-10">
          <div>cat1</div>
          <div>cat2</div>
          <div>cat3</div>
        </div>
      </div>
    </div>
  );
}
