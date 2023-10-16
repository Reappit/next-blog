import { Separator } from '@/components/ui/separator';

type Article = {
  title: string;
  created_at: Date;
  short_story: string;
  full_story: string;
};
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
        {created_at.toString()}
      </div>
      <div className="mt-3">
        <div className="text-xl font-bold">{title}</div>
        <div className="pt-2">{short_story}</div>
      </div>
    </article>
  );
}
