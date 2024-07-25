import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getAllCategories } from '@/repository/category-repository';
import { PostDto } from '@/repository/dto/post';

const EditorComp = dynamic(() => import('../../components/Editor'), {
  ssr: false,
});

interface Props {
  searchParams: {
    id: string;
  };
}

export default async function Write({ searchParams: { id } }: Props) {
  // const cookieStore = cookies();
  // let categories: CategoryDto[] | null;
  // let post: PostDto = {} as PostDto;
  // if (id) {
  //   const [dbPost, dbCategories] = await Promise.all([
  //     getPostById(cookieStore, id),
  //     getAllCategories(cookieStore),
  //   ]);
  //   categories = dbCategories;
  //   post = dbPost ?? PostDto.parse({});
  // } else {
  //   categories = await getAllCategories(cookieStore);
  // }

  return (
    <Suspense fallback={null}>
      {/*<EditorComp post={post} categories={categories} />*/}
    </Suspense>
  );
}
