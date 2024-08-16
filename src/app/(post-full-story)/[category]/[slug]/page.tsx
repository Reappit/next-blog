import { UserCircle } from 'lucide-react';
import PublishedDate from '@/components/PublisedDate';
import React, { Suspense } from 'react';
import { FullPostSkeleton } from '@/components/FullPostSkeleton';
import postService from '@/services/post-service';
import { CustomMdx } from '@/components/mdx';

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
              <CustomMdx source={post.fullStory ?? ''} />
            </div>
          </Suspense>
        </section>
      </div>
    </article>
  );
}
