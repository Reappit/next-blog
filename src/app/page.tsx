import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '@/components/Header';
import Article from '@/components/Article';
import Footer from '@/components/Footer';

export const runtime = 'edge';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: articles = [] } = await supabase.from('article').select();
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 md:grid md:grid-cols-[minmax(0,1fr)_220px] md:gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10">
        <div>
          {articles?.map((article, index) => (
            <Article article={article} key={article.id} first={index === 0} />
          ))}
        </div>
        {/*<div>right menu</div>*/}
      </div>
      <Footer />
    </div>
  );
}
