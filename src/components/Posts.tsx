"use server"
import { getPosts } from '@/repository/post-repository';
import Post from '@/components/Post';

export default async function Posts() {
  const posts = await getPosts();
  return posts?.map((post, index) => (
    <Post post={post} key={post.id} first={index === 0} />
  ));
}
