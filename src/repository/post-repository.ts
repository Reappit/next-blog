import { db } from '@/db';
import { asc, desc, eq } from 'drizzle-orm';
import { postTable } from '@/db/schema';
import { PostInsertDto } from '@/dto/post';

const postRepository = {
  getPosts() {
    return db.query.postTable.findMany({
      with: {
        category: true,
        author: true,
      },
      orderBy: [desc(postTable.createdAt)],
    });
  },

  getPostById(id: number) {
    return db.query.postTable.findFirst({
      where: eq(postTable.id, id),
      with: {
        category: true,
        author: true,
      },
    });
  },

  savePost(post: PostInsertDto) {
    return db.insert(postTable).values(post);
  },

  updatePost(post: PostInsertDto) {
    return db.update(postTable).set(post).where(eq(postTable.id, post.id!));
  },
};

export default postRepository;
