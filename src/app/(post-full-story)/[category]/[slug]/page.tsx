import { UserCircle, Lightbulb, PencilIcon } from 'lucide-react';
import PublishedDate from '@/components/PublisedDate';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React, { Suspense } from 'react';
import remarkDirective from 'remark-directive';
import { admotionPlugin } from '@/components/AdmotionPlugin';
import { FullPostSkeleton } from '@/components/FullPostSkeleton';
import postService from '@/services/post-service';

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
  <div className="min-w-full rounded border-[1px] border-blue-500">
    <div className="flex items-center bg-blue-200/30 py-1 pl-2 font-bold text-black">
      <div className="rounded-full bg-blue-500 p-1.5">
        <PencilIcon size={12} className="text-white" />
      </div>
      <span className="pl-2 font-normal">На заметку</span>
    </div>
    <div className="-mt-5 pl-3">{children}</div>
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
  const postId = slug.split('-').at(-1) ?? '';
  const post = await postService.getPostById(+postId);
  if (!post) {
    return null;
  }
  return (
    <article>
      <div className="flex justify-center">
        <section className="w-full max-w-[680px]">
          <Suspense fallback={<FullPostSkeleton />}>
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
          </Suspense>
        </section>
      </div>
    </article>
  );
}
