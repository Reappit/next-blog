import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PostDto } from '@/dto/post';
import { CategoryDto } from '@/dto/category';
import postService from '@/services/post-service';
import categoryService from '@/services/category-service';

const EditorComp = dynamic(() => import('../../../components/Editor'), {
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
      postService.getPostById(+id),
      categoryService.getAllCategories(),
    ]);
    categories = dbCategories;
    post = dbPost ?? PostDto.parse({});
  } else {
    categories = await categoryService.getAllCategories();
  }

  return (
    <Suspense fallback={null}>
      <EditorComp post={post} categories={categories} />
    </Suspense>
  );
}
