import { CategoryDto } from '@/dto/category';
import { db } from '@/db';
import { categoryTable } from '@/db/schema';

const categoryRepository = {
  async getAllCategories(): Promise<CategoryDto[]> {
    const data = await db.select().from(categoryTable).all();
    return data?.map(d => CategoryDto.parse(d));
  },
};

export default categoryRepository;
