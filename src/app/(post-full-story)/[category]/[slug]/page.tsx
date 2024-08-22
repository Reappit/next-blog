import { PenSquare, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

import IsAdmin from '@/components/custom/is-admin';
import { FullPostSkeleton } from '@/components/FullPostSkeleton';
import { CustomMdx } from '@/components/mdx';
import PublishedDate from '@/components/PublisedDate';
import TimeToRead from '@/components/time-to-read';
import { env } from '@/env';
import postService from '@/services/post-service';

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const postId = slug.split('-').at(-1) ?? '';
  console.log('slug/page', postId);
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
                <div>@{post.author.login}</div>
                <div>
                  <TimeToRead symbols={post.fullStory?.length ?? 0} />
                  <span className="mx-2">·</span>
                  <PublishedDate date={post.createdAt ?? ''} />
                </div>
              </div>
            </div>
            <IsAdmin>
              <div className="mt-10 flex items-center border-y-[1px] px-2 py-[10px]">
                <div className="p-2">
                  <Link href={'/editor?id=' + postId}>
                    <PenSquare strokeWidth={0.5} />
                  </Link>
                </div>
              </div>
            </IsAdmin>

            <div className="mt-10">
              {post.posterId && (
                <Image
                  src={env.NEXT_PUBLIC_IMAGE_BASE_URL + post.posterId}
                  alt="poster"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
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
