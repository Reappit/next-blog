import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

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
  const supabase = createServerComponentClient<DB>({
    cookies: () => cookieStore,
  });
  const article = { subtitle: '', fullStory: defaultMarkdown, title: '' };
  if (id) {
    const { data } = await supabase
      .from('article')
      .select('*, category(*)')
      .eq('short_id', id)
      .limit(1);
    const dbArticle = data?.at(0) as Article;
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
