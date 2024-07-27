'use server';

import { PostDto } from '@/repository/dto/post';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { postTable } from '@/db/schema';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

export async function getPosts() {
  const data = await db.query.postTable.findMany({
    with: {
      category: true,
    },
  });
  return data?.map(d => PostDto.parse(d));
}

export async function getPostById(id: number): Promise<PostDto | undefined> {
  const data = await db.query.postTable.findFirst({
    where: eq(postTable.id, id),
    with: {
      category: true,
    },
  });
  return PostDto.parse(data);
}
//
// function waitForSeconds(seconds: number) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`Promise resolved after ${seconds} seconds`);
//     }, seconds * 1000);
//   });
// }
//
// export async function getPostByShortId(
//   cookieStore: ReturnType<typeof cookies>,
//   id: string,
// ) {
//   await waitForSeconds(10);
//   const supabase = createServClient(cookieStore);
//   const { data } = await supabase
//     .from('post')
//     .select('*, category(*)')
//     .eq('short_id', id)
//     .limit(1);
//   return PostDto.parse(data?.[0]);
// }
//

const formSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(z.string().min(20).max(250)),
  subTitle: zfd.text(z.string().min(0).max(250)),
  fullStory: zfd.text(z.string().min(0).max(10_000)),
  metaTitle: zfd.text(z.string().min(0).max(250)),
  category: zfd.numeric(z.number().optional()),
  published: zfd.checkbox({ trueValue: 'true' }).optional(),
});
export async function savePost(formData: FormData) {
  try {
    const { id, fullStory, subTitle, title, metaTitle, category, published } =
      formSchema.parse(formData);
    // const cookieStore = cookies();
    // const supabase = createServClient(cookieStore);
    // const user = await getCurrentUser(cookieStore);
    const user = {id: ''};
    const payload = {
      meta_title: metaTitle,
      category: category ?? 1,
      author: user?.id ?? '',
      full_story: fullStory,
      subtitle: subTitle,
      published: !!published,
      title,
    };

    if (id) {
      const { data, error } = await supabase
        .from('post')
        .update(payload)
        .eq('id', id)
        .select();
      if (error || data?.length === 0) {
        throw error || 'Not allow to save';
      }
      return data;
    } else {
      const { data, error } = await supabase
        .from('post')
        .insert(payload)
        .select();
      if (error || data?.length === 0) {
        throw error || 'Not allow to save';
      }
      return data;
    }
  } catch (e: unknown) {
    if (e instanceof Object && 'message' in e) {
      const message = (e as QueryError).message.includes(
        'row-level security policy',
      )
        ? 'Нет доступа'
        : e.message;
      return Promise.reject(message);
    }

    if (e instanceof z.ZodError) {
      return Promise.reject(e.issues.map((e) => e.message));
    }
    return Promise.reject(e);
  }
}
