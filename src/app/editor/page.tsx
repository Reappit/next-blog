import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getPostById } from '@/repository/post-repository';
import { getAllCategories } from '@/repository/category-repository';

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
  const post = { subtitle: '', fullStory: defaultMarkdown, title: '' };
  let categories: CategoryTable[] | null;
  if (id) {
    const [dbPost, dbCategories] = await Promise.all([
      getPostById(cookieStore, id),
      getAllCategories(cookieStore),
    ]);
    categories = dbCategories;
    post.fullStory = dbPost?.full_story ?? '';
    post.subtitle = dbPost?.subtitle ?? '';
    post.title = dbPost?.title ?? '';
  } else {
    categories = await getAllCategories(cookieStore);
  }

  return (
    <Suspense fallback={null}>
      <EditorComp categories={categories} />
    </Suspense>
  );
}
