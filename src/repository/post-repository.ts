import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { postTable } from '@/db/schema';
import { type PostInsertDto } from '@/dto/post';

const postRepository = {
  getPosts({ allPosts = false }: { allPosts: boolean }) {
    return db.query.postTable.findMany({
      with: {
        category: true,
        author: true,
      },
      orderBy: [desc(postTable.createdAt)],
      ...(!allPosts
        ? {
            where: eq(postTable.published, true),
          }
        : {}),
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
