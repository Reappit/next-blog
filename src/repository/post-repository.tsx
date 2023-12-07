'use server';
import { createServClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { getCurrentUser } from '@/repository/user-repository';
import { PostDto } from '@/repository/dto/post';

export async function getPostById(
  cookieStore: ReturnType<typeof cookies>,
  id: string,
): Promise<PostTable | undefined> {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase
    .from('post')
    .select('*, category(*)')
    .eq('id', id)
    .limit(1);

  return data?.[0];
}

export async function getPostByShortId(
  cookieStore: ReturnType<typeof cookies>,
  id: string,
) {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase
    .from('post')
    .select('*, category(*)')
    .eq('short_id', id)
    .limit(1);
  return PostDto.parse(data?.[0]);
}

export async function getPosts(cookieStore: ReturnType<typeof cookies>) {
  const supabase = createServClient(cookieStore);
  const { data } = await supabase.from('post').select('*, category(*)');
  return data?.map((d) => PostDto.parse(d));
}

const formSchema = zfd.formData({
  id: zfd.numeric(),
  title: zfd.text(z.string().min(20).max(250)),
  subTitle: zfd.text(z.string().min(0).max(250)),
  fullStory: zfd.text(z.string().min(0).max(10_000)),
  metaTitle: zfd.text(z.string().min(0).max(250)),
});

export async function savePost(formData: FormData) {
  try {
    const { id, fullStory, subTitle, title, metaTitle } =
      formSchema.parse(formData);
    const cookieStore = cookies();
    const supabase = createServClient(cookieStore);
    const user = await getCurrentUser(cookieStore);
    const payload = {
      meta_title: metaTitle,
      category: 1,
      author: user?.id ?? '',
      full_story: fullStory,
      subtitle: subTitle,
      title,
    };
    if (id) {
      const { data, error } = await supabase
        .from('post')
        .update(payload)
        .eq('id', id)
        .select();
      console.error(error);
      return data;
    } else {
      const { data, error } = await supabase
        .from('post')
        .update(payload)
        .eq('id', id)
        .select();
      console.error(error);
      return data;
    }
  } catch (e) {
    console.error(e);
    return Promise.reject('Check input data');
  }
}
