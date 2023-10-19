import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Bookmark, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

function PublishedDate({ date }: { date: string }) {
  return <span>{format(new Date(date), 'hh:mm, dd MMM yyyy')}</span>;
}

export default function Article({
  article: { title, created_at, short_story, category },
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
        <Link href={`${category.alt_name}/${title}`}>
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
                <Bookmark />
              </div>
              <div className="p-2">
                <ThumbsUp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
