import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getPostById } from '@/repository/post-repository';

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
  if (id) {
    const dbPost = await getPostById(cookieStore, id);
    post.fullStory = dbPost?.full_story ?? '';
    post.subtitle = dbPost?.subtitle ?? '';
    post.title = dbPost?.title ?? '';
  }

  return (
    <Suspense fallback={null}>
      <EditorComp {...post} />
    </Suspense>
  );
}
