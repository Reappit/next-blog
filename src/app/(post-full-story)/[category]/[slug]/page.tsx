import { cookies } from 'next/headers';
import { UserCircle } from 'lucide-react';
import PublishedDate from '@/components/PublisedDate';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import { getPostByShortId } from '@/repository/post-repository';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import directive from 'remark-directive';

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const postShortId = slug.split('-').at(-1) ?? '';
  const post = await getPostByShortId(cookieStore, postShortId);
  return (
    <Suspense fallback={<>Loading...</>}>
      <article>
        <div className="flex justify-center">
          <section className="w-full max-w-[680px]">
            <div className="mt-[1.19em]">
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>
            <div className="mt-8 flex items-center">
              <div>
                <UserCircle size={50} strokeWidth={0.5} />
              </div>
              <div className="ml-3">
                <div>Admin</div>
                <div>
                  <PublishedDate date={post.createdAt ?? ''} />
                </div>
              </div>
            </div>
            <div className="mt-10 border-y-[1px] px-2 py-[3px]">qqq</div>
            <div className="prose mt-10">
              <MDXRemote
                source={post.fullStory ?? ''}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, directive],
                    format: 'md',
                  },
                  parseFrontmatter: true,
                }}
              />
            </div>
          </section>
        </div>
      </article>
    </Suspense>
  );
}
