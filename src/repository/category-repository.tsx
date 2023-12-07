import { type cookies } from 'next/headers';
import { createServClient } from '@/lib/supabase/server';

export async function getAllCategories(
  cookieStore: ReturnType<typeof cookies>,
): Promise<CategoryTable[] | null> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase.from('category').select();
  return data;
}
