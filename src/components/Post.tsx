import { Separator } from '@/components/ui/separator';

import { Badge } from '@/components/ui/badge';
import { Bookmark, PenSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import PublishedDate from '@/components/PublisedDate';
import { type PostDto } from '@/dto/post';
import IsAdmin from '@/components/IsAdmin';

export default function Post({
  post: { title, createdAt, subTitle, metaTitle, id, category, author },
  first = false,
}: {
  first?: boolean;
  post: PostDto;
}) {
  return (
    <article className="mx-6 flex flex-col justify-center pt-6">
      {!first && <Separator />}
      <div className="pt-6">
        <span>{author.name}</span>
        <span className="mx-1">·</span>
        <PublishedDate date={createdAt} />
      </div>
      <div className="mt-3">
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

        <div className="mb-4 mt-8">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Badge
                variant="secondary"
                className="mr-2 rounded-2xl px-2 py-1 font-normal"
              >
                {category?.name}
              </Badge>
              <span className="text-sm font-normal">5 min read</span>
            </div>
            <div className="flex">
              <IsAdmin>
                <div className="p-2">
                  <Link href={'/editor?id=' + id}>
                    <PenSquare strokeWidth={0.5} />
                  </Link>
                </div>
              </IsAdmin>
              <div className="p-2">
                <Bookmark strokeWidth={0.5} />
              </div>
              <div className="p-2">
                <ThumbsUp strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
