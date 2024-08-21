import Post from '@/components/Post';
import { auth } from '@/lib/auth';
import postService from '@/services/post-service';

export default async function Posts() {
  const session = await auth();
  const allPosts = session?.user?.role === 'admin';
  const posts = await postService.getPosts({ allPosts });
  return posts?.map((post, index) => (
    <Post post={post} key={post.id} first={index === 0} />
  ));
}
