'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { PostInsertDto } from '@/dto/post';
import { auth } from '@/lib/auth';
import postService from '@/services/post-service';

const formSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(20).max(250),
  subTitle: z.string().min(0).max(250),
  fullStory: z.string().min(0).max(10_000),
  metaTitle: z.string().min(0).max(250),
  category: z.coerce.number().optional(),
  // published: z.literal(["on"]).success(), // will be part of zod 4 !
  published: z
    .string()
    .nullish()
    .transform(value => value === 'on'),
  posterId: z.string().optional().nullable(),
});

type State = {
  id?: string;
  error?: string;
};

export async function savePost(
  state: State,
  formData: FormData
): Promise<State> {
  try {
    const session = await auth();
    if (session?.user?.role !== 'admin') {
      throw 'Unauthorised';
    }
    const schemaData = formSchema.parse({
      id: formData.get('id') ?? undefined,
      title: formData.get('title'),
      subTitle: formData.get('subTitle'),
      fullStory: formData.get('fullStory'),
      metaTitle: formData.get('metaTitle'),
      category: formData.get('category'),
      published: formData.get('published'),
      posterId: formData.get('posterId'),
    });
    const postDto = PostInsertDto.parse({
      ...schemaData,
      author: session?.user.id ?? '',
    });
    const data = await postService.saveOrUpdatePost(postDto);
    revalidatePath('/editor');
    revalidatePath('/');
    return {
      id:
        (data.lastInsertRowid?.toString() as unknown as string) ??
        postDto.id?.toString() ??
        '-1',
    };
  } catch (e: unknown) {
    return { error: e?.toString() };
  }
}
