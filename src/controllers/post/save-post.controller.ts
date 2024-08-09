'use server';
import postService from '@/services/post-service';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { PostInsertDto } from '@/dto/post';

const formSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(20).max(250),
  subTitle: z.string().min(0).max(250),
  fullStory: z.string().min(0).max(10_000),
  metaTitle: z.string().min(0).max(250),
  category: z.coerce.number().optional(),
  published: z.boolean(),
});

type State = {
  id?: number;
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
      id: formData.get('id'),
      title: formData.get('title'),
      subTitle: formData.get('subTitle'),
      fullStory: formData.get('fullStory'),
      metaTitle: formData.get('metaTitle'),
      category: formData.get('category'),
      published: formData.get('published'),
    });
    const postDto = PostInsertDto.parse({
      ...schemaData,
      author: session?.user.id ?? '',
    });
    const data = await postService.saveOrUpdatePost(postDto);
    return {
      id: (data.lastInsertRowid?.toString() as unknown as number) ?? -1,
    };
  } catch (e: unknown) {
    return { error: e?.toString() };
  }
}
