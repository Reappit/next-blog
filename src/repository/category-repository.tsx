import { CategoryDto } from '@/repository/dto/category';
import { db } from '@/db';
import { categoryTable } from '@/db/schema';

export async function getAllCategories(): Promise<CategoryDto[]> {
  const data = await db.select().from(categoryTable).all();
  return data?.map(d => CategoryDto.parse(d));
}
