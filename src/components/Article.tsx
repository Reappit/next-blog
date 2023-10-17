import { Separator } from '@/components/ui/separator';
import { format, parse } from 'date-fns';
type Article = {
  title: string;
  created_at: string;
  short_story: string;
  full_story: string;
};

function PublishedDate({ date }: { date: string }) {
  return <span>{format(new Date(date), 'hh:mm, dd MMM yyyy')}</span>;
}

export default function Article({
  article: { title, created_at, short_story },
  first = false,
}: {
  first?: boolean;
  article: Article;
}) {
  return (
    <article className="mx-6 flex flex-col justify-center pt-6">
      {!first && <Separator />}
      <div className="pt-6">
        Admin <span className="mx-1">·</span>
        <PublishedDate date={created_at} />
      </div>
      <div className="mt-3">
        <div className="text-xl font-bold">{title}</div>
        <div className="pt-2">{short_story}</div>
      </div>
    </article>
  );
}
