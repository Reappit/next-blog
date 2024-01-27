import { cookies } from 'next/headers';
import { UserCircle, Lightbulb } from 'lucide-react';
import PublishedDate from '@/components/PublisedDate';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React, { Suspense } from 'react';
import { getPostByShortId } from '@/repository/post-repository';
import remarkDirective from 'remark-directive';
import { admotionPlugin } from '@/components/AdmotionPlugin';

interface CustomComponentProps {
  href: string;
  children: React.ReactNode;
}

type CustomComponent = React.ComponentType<CustomComponentProps>;

const Tip: CustomComponent = ({ children }) => (
  <div className="min-w-full border-l-4 border-green-700">
    <div className="flex items-center bg-green-700/30 py-1 pl-2 font-bold text-black">
      <Lightbulb size={21} className="text-green-700" />
      <span className="pl-1">Лайфхак</span>
    </div>
    <div className="-mt-5 bg-green-800/10 pl-4">{children}</div>
  </div>
);

const Note: CustomComponent = ({ children }) => (
  <div className="min-w-full border-l-4 border-blue-700">
    <div className="flex items-center bg-blue-700/30 py-1 pl-2 font-bold text-black">
      <Lightbulb size={21} className="text-blue-700" />
      <span className="pl-1">На заметку</span>
    </div>
    <div className="-mt-5 bg-blue-800/10 pl-4">{children}</div>
  </div>
);

const customComponents = {
  note: Note,
  tip: Tip,
  danger: Note,
  info: Note,
  caution: Note,
};

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
            <div className="mt-10 border-y-[1px] px-2 py-[3px]">
              what is here?
            </div>
            <div className="prose mt-10 min-w-full">
              <MDXRemote
                source={post.fullStory ?? ''}
                options={{
                  mdxOptions: {
                    format: 'md',
                    remarkPlugins: [remarkDirective, admotionPlugin as never],
                  },
                  parseFrontmatter: true,
                }}
                components={customComponents}
              />
            </div>
          </section>
        </div>
      </article>
    </Suspense>
  );
}
