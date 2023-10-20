import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserCircle } from 'lucide-react';

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
  const { data } = await supabase
    .from('article')
    .select('*, category(*)')
    .eq('short_id', articleShortId)
    .limit(1);
  const article = data?.at(0) as Article;
  return (
    <article>
      <div className="flex justify-center">
        <section className="max-w-[680px]">
          <div className="mt-[1.19em]">
            <h1 className="text-4xl font-bold">{article.title}</h1>
          </div>
          <div className="mt-8 flex items-center">
            <div>
              <UserCircle size={50} strokeWidth={0.5} />
            </div>
            <div className="ml-3">
              <div>Admin</div>
              <div>3 min read · Oct</div>
            </div>
          </div>
          <div className="mt-10 border-y-2 px-2 py-[3px]">qqq</div>
          <div className="mt-10">{article.full_story}</div>
        </section>
      </div>
    </article>
  );
}
