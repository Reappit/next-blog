import { db } from '@/db';
import { eq } from 'drizzle-orm';

import { userTable } from '@/db/schema';

const userRepository = {
  async  getUserByUsername(userName: string) {
    return db.query.userTable.findFirst({
      where: eq(userTable.username, userName),
    });
  }
}

export default userRepository;
