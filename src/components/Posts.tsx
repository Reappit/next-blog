import Post from '@/components/Post';
import postService from '@/services/post-service';

export default async function Posts() {
  const posts = await postService.getPosts();
  return posts?.map((post, index) => (
    <Post post={post} key={post.id} first={index === 0} />
  ));
}
