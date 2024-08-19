import { PostDto, type PostInsertDto } from '@/dto/post';
import postRepository from '@/repository/post-repository';

const postService = {
  async getPostById(id: string | number) {
    const post = await postRepository.getPostById(+id);
    return PostDto.parse(post);
  },

  async getPosts() {
    const posts = await postRepository.getPosts();
    return posts.map(post => PostDto.parse(post));
  },

  async saveOrUpdatePost(postDto: PostInsertDto) {
    try {
      if (Number.isInteger(postDto.id)) {
        return postRepository.updatePost(postDto);
      } else {
        return postRepository.savePost(postDto);
      }
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  },
};
export default postService;
