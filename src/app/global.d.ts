import { type Database } from '@/lib/database.types';

declare global {
  type DB = Database;
  type tables = DB['public']['Tables'];
  type Article = tables['article']['Row'] & {
    category: tables['category']['Row'];
  };
}
