import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { postTable } from '@/db/schema';
import { PostDto } from '@/dto/post';

const postRepository = {
  getPosts() {
    return db.query.postTable.findMany({
      with: {
        category: true,
      },
    });
  },
  getPostById(id: number) {
    return db.query.postTable.findFirst({
      where: eq(postTable.id, id),
      with: {
        category: true,
      },
    });
  },

  savePost(post: PostDto) {
    return db
      .insert(postTable)
      .values({ ...post, category: post.category?.id ?? -1 });
  },

  updatePost(post: PostDto) {
    return db
      .update(postTable)
      .set({ ...post, category: post.category?.id ?? -1 })
      .where(eq(postTable.id, post.id));
  },
};

export default postRepository;
