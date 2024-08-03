import postRepository from '@/repository/post-repository';
import { PostDto } from '@/dto/post';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { auth } from '@/lib/auth';

const formSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(z.string().min(20).max(250)),
  subTitle: zfd.text(z.string().min(0).max(250)),
  fullStory: zfd.text(z.string().min(0).max(10_000)),
  metaTitle: zfd.text(z.string().min(0).max(250)),
  category: zfd.numeric(z.number().optional()),
  published: zfd.checkbox({ trueValue: 'true' }).optional(),
});

const postService = {
  async getPostById(id: string | number) {
    const post = await postRepository.getPostById(+id);
    return PostDto.parse(post);
  },

  async getPosts() {
    const posts = await postRepository.getPosts();
    return posts.map(post => PostDto.parse(post));
  },

  async savePost(formData: FormData) {
    try {
      const schemaData = formSchema.parse(formData);
      const session = await auth();
      const payload = PostDto.parse(schemaData);
      payload.author = session?.user.id ?? '';

      if (payload.id) {
        return postRepository.savePost(payload);
      } else {
        return postRepository.updatePost(payload);
      }
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  },
};
export default postService;
