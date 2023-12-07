import { cookies } from 'next/headers';
import Post from '@/components/Post';
import { getPosts } from '@/repository/post-repository';

export const runtime = 'edge';

export default async function Posts() {
  const cookieStore = cookies();
  const posts = await getPosts(cookieStore);

  return posts?.map((post, index) => (
    <Post post={post} key={post.shortId} first={index === 0} />
  ));
}
