import Posts from '@/components/Posts';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="flex flex-row justify-evenly">
      <main className="md:min-w-[728px] md:max-w-[728px] lg:min-w-[728px] lg:max-w-[728px]">
        <Suspense>
          <Posts />
        </Suspense>
      </main>
      <div className="hidden min-h-[100vh] border-l md:min-w-[300px] md:max-w-[368px] lg:block">
        <div className="mt-10 pl-10">
          <div>cat1</div>
          <div>cat2</div>
          <div>cat3</div>
        </div>
      </div>
    </div>
  );
}
