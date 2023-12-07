import { type Database } from '@/lib/supabase/database.types';

declare global {
  type DB = Database;
  type tables = DB['public']['Tables'];
  type PostTable = Omit<tables['post']['Row'], 'category'> & {
    category: CategoryTable;
  };
  type CategoryTable = tables['category']['Row'];
}
