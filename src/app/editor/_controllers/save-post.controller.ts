'use server';
import postService from '@/services/post-service';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { PostInsertDto } from '@/dto/post';

const formSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(z.string().min(20).max(250)),
  subTitle: zfd.text(z.string().min(0).max(250)),
  fullStory: zfd.text(z.string().min(0).max(10_000)),
  metaTitle: zfd.text(z.string().min(0).max(250)),
  category: zfd.numeric(z.number().optional()),
  published: zfd.checkbox({ trueValue: 'true' }).optional(),
});

type State = {
  id?: number;
  error?: string;
};

export default async function (
  state: State,
  formData: FormData
): Promise<State> {
  try {
    const session = await auth();
    if (session?.user?.role !== 'admin') {
      throw 'Unauthorised';
    }
    const schemaData = formSchema.parse(formData);
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
