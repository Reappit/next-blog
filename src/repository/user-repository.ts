import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { userTable } from '@/db/schema';

const userRepository = {
  async getUserByEmail(email: string) {
    return db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
  },
};

export default userRepository;
