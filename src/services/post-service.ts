import postRepository from '@/repository/post-repository';
import { PostDto } from '@/dto/post';

const postService = {
  savePost() {},
  async getPostById(id: string | number) {
    const post = await postRepository.getPostById(+id);
    return PostDto.parse(post);
  },
};
export default postService;
