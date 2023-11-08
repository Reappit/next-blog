import { type Database } from '@/lib/supabase/database.types';

declare global {
  type DB = Database;
  type tables = DB['public']['Tables'];
  type PostTable = tables['post']['Row'] & {
    category: tables['category']['Row'];
  };
}
