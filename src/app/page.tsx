import { Suspense } from 'react';

import Categories from '@/components/Categories';
import { PostListSkeleton } from '@/components/PostListSkeleton';
import Posts from '@/components/Posts';

export default function Home() {
  return (
    <div className="flex flex-row justify-evenly">
      <main className="md:min-w-[728px] md:max-w-[728px] lg:min-w-[728px] lg:max-w-[728px]">
        <Suspense fallback={<PostListSkeleton />}>
          <Posts />
        </Suspense>
      </main>
      <div className="hidden min-h-[100vh] border-l md:min-w-[300px] md:max-w-[368px] lg:block">
        <div className="mt-10 pl-10">
          <Suspense fallback={<PostListSkeleton />}>
            <Categories />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
