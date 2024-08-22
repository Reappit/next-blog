import {
  // Bookmark,
  PenSquare,
  // ThumbsUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import IsAdmin from '@/components/custom/is-admin';
import PublishedDate from '@/components/PublisedDate';
import TimeToRead from '@/components/time-to-read';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { type PostDto } from '@/dto/post';
import { env } from '@/env';

export default function Post({
  post: {
    title,
    createdAt,
    subTitle,
    metaTitle,
    id,
    category,
    author,
    fullStory,
    posterId,
    published,
  },
  first = false,
}: {
  first?: boolean;
  post: PostDto;
}) {
  const t = useTranslations('Post');
  return (
    <article className="mx-6 flex flex-col justify-center pt-6">
      {!first && <Separator />}
      <div className="pt-6">
        <span>@{author.login}</span>
        <span className="mx-1">·</span>
        <PublishedDate date={createdAt} />
        {!published && (
          <span className="bold ml-4 bg-red-200 text-red-600">
            {t('notPublished')}
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <Link href={`${category?.metaName}/${metaTitle}-${id}`}>
            <h2 className="line-clamp-3 max-h-[72px] text-xl font-bold leading-6">
              {title}
            </h2>
            <div className="pt-2">
              <p className="line-clamp-3 max-h-[72px] text-lg leading-6">
                {subTitle}
              </p>
            </div>
          </Link>
          <div className="relative h-[107px] w-[160px]">
            <Image
              className="object-cover"
              src={env.NEXT_PUBLIC_IMAGE_BASE_URL + posterId}
              alt="poster"
              fill
              sizes="160px"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Badge
                variant="secondary"
                className="mr-2 rounded-2xl px-2 py-1 font-normal"
              >
                {category?.name}
              </Badge>
              <TimeToRead symbols={fullStory?.length ?? 0} />
            </div>
            <div className="flex">
              <IsAdmin>
                <div className="p-2">
                  <Link href={'/editor?id=' + id}>
                    <PenSquare strokeWidth={0.5} />
                  </Link>
                </div>
              </IsAdmin>
              {/*<div className="p-2">*/}
              {/*  <Bookmark strokeWidth={0.5} />*/}
              {/*</div>*/}
              {/*<div className="p-2">*/}
              {/*  <ThumbsUp strokeWidth={0.5} />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
