import * as schema from './schema';
import { env } from '@/env';
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";

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
  db = drizzle(turso);
} else {
  if (!global.db) {
    global.db = drizzle(turso);
  }
  db = global.db;
}

export { db };
