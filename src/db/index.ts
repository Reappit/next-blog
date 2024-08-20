import { createClient } from '@libsql/client/web';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';

import { env } from '@/env';

import * as schema from './schema';

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: LibSQLDatabase<typeof schema> | undefined;
}

const turso = createClient({
  url: env.TURSO_DATABASE_URL!,
  authToken: env.TURSO_AUTH_TOKEN,
});

let db: LibSQLDatabase<typeof schema>;

if (env.NODE_ENV === 'production') {
  db = drizzle(turso, { schema });
} else {
  if (!global.db) {
    global.db = drizzle(turso, { schema });
  }
  db = global.db;
}

export { db };
