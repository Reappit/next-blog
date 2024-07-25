import { type cookies } from 'next/headers';

export async function getAllCategories(
  cookieStore: ReturnType<typeof cookies>,
): Promise<any> {
  // const supabase = createServClient(cookieStore);
  // const { data } = await supabase.from('category').select();
  // return data ? data.map((d) => CategoryDto.parse(d)) : null;
}
