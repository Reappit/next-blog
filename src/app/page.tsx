import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: articles } = await supabase.from('article').select();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test1
    </main>
  );
}
