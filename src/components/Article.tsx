import { Separator } from '@/components/ui/separator';
import { differenceInDays, format, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Bookmark, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

function PublishedDate({ date }: { date: string }) {
  const isMoreThan7Days = differenceInDays(new Date(date), new Date());
  const formatedDate = format(new Date(date), 'MMM dd, yyyy', {
    locale: ru,
  }).replace('.', '');
  return (
    <span>
      {isMoreThan7Days
        ? formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1)
        : formatRelative(new Date(date), new Date(), {
            locale: ru,
          })}
    </span>
  );
}

export default function Article({
  article: { title, created_at, short_story, category, meta_title, short_id },
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
              {short_story}
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
