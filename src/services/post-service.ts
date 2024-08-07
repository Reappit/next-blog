import postRepository from '@/repository/post-repository';
import { PostDto, PostInsertDto } from '@/dto/post';

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
      if (postDto.id) {
        return postRepository.savePost(postDto);
      } else {
        return postRepository.updatePost(postDto);
      }
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  },
};
export default postService;
