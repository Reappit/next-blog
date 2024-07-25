import { cookies } from 'next/headers';
// import { createServClient } from '@/lib/supabase/server';
// import { getCurrentUser } from '@/repository/user-repository';

export async function uploadPostImage(slug: string, file: File) {
  // const cookieStore = cookies();
  // const user = await getCurrentUser(cookieStore);
  //
  // if (!user?.id) {
  //   throw 'Unauthenticated';
  // }
  // const supabase = createServClient(cookieStore);
  // const storage = supabase.storage.from('post_image');
  //
  // const response = await storage.upload(`/${slug}/${Date.now()}`, file);
  //
  // if (response.error) {
  //   throw response.error.message;
  // }
  // return response.data.path;
}
