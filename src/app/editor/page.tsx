import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { getAllCategories } from '@/repository/category-repository';
import { PostDto } from '@/repository/dto/post';
import { CategoryDto } from '@/repository/dto/category';
import { getPostById } from '@/repository/post-repository';

const EditorComp = dynamic(() => import('../../components/Editor'), {
  ssr: false,
});

interface Props {
  searchParams: {
    id: string;
  };
}

export default async function Write({ searchParams: { id } }: Props) {
  let categories: CategoryDto[] | null;
  let post: PostDto = {} as PostDto;
  if (id) {
    const [dbPost, dbCategories] = await Promise.all([
      getPostById(+id),
      getAllCategories(),
    ]);
    categories = dbCategories;
    post = dbPost ?? PostDto.parse({});
  } else {
    categories = await getAllCategories();
  }

  return (
    <Suspense fallback={null}>
      <EditorComp post={post} categories={categories} />
    </Suspense>
  );
}
