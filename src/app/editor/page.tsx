import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getArticleById } from '@/repository/article-repository';

const EditorComp = dynamic(() => import('../../components/Editor'), {
  ssr: false,
});

const defaultMarkdown = `
  ### Лучшая статья
`;

interface Props {
  searchParams: {
    id: string;
  };
}

export default async function Write({ searchParams: { id } }: Props) {
  const cookieStore = cookies();
  const article = { subtitle: '', fullStory: defaultMarkdown, title: '' };
  if (id) {
    const dbArticle = await getArticleById(cookieStore, id);
    article.fullStory = dbArticle?.full_story ?? '';
    article.subtitle = dbArticle?.subtitle ?? '';
    article.title = dbArticle?.title ?? '';
  }

  return (
    <Suspense fallback={null}>
      <EditorComp {...article} />
    </Suspense>
  );
}
