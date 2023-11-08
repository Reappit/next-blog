'use server';
import { type cookies } from 'next/headers';
import { createServClient } from '@/lib/supabase/server';
import { da } from 'date-fns/locale';

export async function getPostById(
  cookieStore: ReturnType<typeof cookies>,
  id: string,
): Promise<PostTable | undefined> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase
    .from('post')
    .select('*, category(*)')
    .eq('short_id', id)
    .limit(1);

  return data?.[0];
}

export async function getPosts(
  cookieStore: ReturnType<typeof cookies>,
): Promise<PostTable[] | []> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase.from('post').select('*, category(*)');
  return data ?? [];
}

export async function savePost(fullStory: string, data: FormData) {
  console.log(fullStory);
  await Promise.resolve();
}
