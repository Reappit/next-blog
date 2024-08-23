import { PenSquare, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

import IsAdmin from '@/components/custom/is-admin';
import { FullPostSkeleton } from '@/components/FullPostSkeleton';
import { CustomMdx } from '@/components/mdx';
import PublishedDate from '@/components/PublisedDate';
import TimeToRead from '@/components/time-to-read';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { env } from '@/env';
import { cn } from '@/lib/utils';
import postService from '@/services/post-service';

const postWidth = 680;

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
        <section className={cn('w-full', `max-w-[680px]`)}>
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

            <div>
              {post.posterId && (
                <AspectRatio ratio={1.5} className="bg-muted">
                  <Image
                    className={cn(
                      'h-full w-full object-cover'
                      // 'max-h-[430px] object-cover',
                      // `w-[${postWidth}px] `
                    )}
                    src={env.NEXT_PUBLIC_IMAGE_BASE_URL + post.posterId}
                    alt={'poster ' + post.metaTitle}
                    sizes={postWidth + 'px'}
                    fill
                    // width={postWidth}
                    // height={430}
                  />
                </AspectRatio>
              )}
            </div>
            <div className="prose mt-10 min-w-full">
              <CustomMdx source={post.fullStory ?? ''} imgWidth={postWidth} />
            </div>
          </Suspense>
        </section>
      </div>
    </article>
  );
}
