import { db } from '@/db';
import { eq } from 'drizzle-orm';

import { userTable } from '@/db/schema';

const userRepository = {
  async getUserByEmail(email: string) {
    return db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
  },
};

export default userRepository;
