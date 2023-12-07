import { type cookies } from 'next/headers';
import { createServClient } from '@/lib/supabase/server';
import { CategoryDto } from '@/repository/dto/category';

export async function getAllCategories(
  cookieStore: ReturnType<typeof cookies>,
): Promise<CategoryDto[] | null> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase.from('category').select();
  return data ? data.map((d) => CategoryDto.parse(d)) : null;
}
