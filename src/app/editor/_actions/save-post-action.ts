'use server';
import postService from '@/services/post-service';

type State = {
  id?: number;
  error?: string;
};

export default async function (
  state: State,
  formData: FormData
): Promise<State> {
  try {
    const data = await postService.savePost(formData);
    return {
      id: (data.lastInsertRowid?.toString() as unknown as number) ?? -1,
    };
  } catch (e: unknown) {
    return { error: e?.toString() };
  }
}
