import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const EditorComp = dynamic(() => import('../../components/Editor'), {
  ssr: false,
});

const defaultMarkdown = `
  # Лучшая статья
`;

interface Props {
  searchParams: {
    id: string;
  };
}

export default async function Write({ searchParams: { id } }: Props) {
  const cookieStore = cookies();
  const supabase = createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
  const article = { subtitle: '', fullStory: defaultMarkdown, title: '' };
  if (id) {
    const { data } = await supabase
      .from('article')
      .select('*, category(*)')
      .eq('short_id', id)
      .limit(1);
    const dbArticle = data?.at(0) as ArticleTable;
    article.fullStory = dbArticle.full_story ?? '';
    article.subtitle = dbArticle.subtitle ?? '';
    article.title = dbArticle.title ?? '';
  }

  return (
    <Suspense fallback={null}>
      <EditorComp {...article} />
    </Suspense>
  );
}
