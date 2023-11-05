import { cookies } from 'next/headers';
import { UserCircle } from 'lucide-react';
import PublishedDate from '@/components/PublisedDate';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import { getArticleById } from '@/repository/article-repository';

export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const articleShortId = slug.split('-').at(-1) ?? '';
  const article = await getArticleById(cookieStore, articleShortId);
  return (
    <Suspense fallback={<>Loading...</>}>
      <article>
        <div className="flex justify-center">
          <section className="max-w-[680px]">
            <div className="mt-[1.19em]">
              <h1 className="text-4xl font-bold">{article?.title}</h1>
            </div>
            <div className="mt-8 flex items-center">
              <div>
                <UserCircle size={50} strokeWidth={0.5} />
              </div>
              <div className="ml-3">
                <div>Admin</div>
                <div>
                  <PublishedDate date={article?.created_at ?? ''} />
                </div>
              </div>
            </div>
            <div className="mt-10 border-y-[1px] px-2 py-[3px]">qqq</div>
            <div className="mt-10">
              <MDXRemote source={article?.full_story ?? ''} />
            </div>
          </section>
        </div>
      </article>
    </Suspense>
  );
}
