import { Separator } from '@/components/ui/separator';

import { Badge } from '@/components/ui/badge';
import { Bookmark, PenSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import PublishedDate from '@/components/PublisedDate';

export default function Article({
  article: { title, created_at, subtitle, category, meta_title, short_id },
  first = false,
}: {
  first?: boolean;
  article: Article;
}) {
  return (
    <article className="mx-6 flex flex-col justify-center pt-6">
      {!first && <Separator />}
      <div className="pt-6">
        Admin<span className="mx-1">·</span>
        <PublishedDate date={created_at} />
      </div>
      <div className="mt-3">
        <Link href={`${category.meta_name}/${meta_title}-${short_id}`}>
          <h2 className="line-clamp-3 max-h-[72px] text-xl font-bold leading-6">
            {title}
          </h2>
          <div className="pt-2">
            <p className="line-clamp-3 max-h-[72px] text-lg leading-6">
              {subtitle}
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
                {category.name}
              </Badge>
              <span className="text-sm font-normal">5 min read</span>
            </div>
            <div className="flex">
              <div className="p-2">
                <Link href={'/editor?id=' + short_id}>
                  <PenSquare strokeWidth={0.5} />
                </Link>
              </div>
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
