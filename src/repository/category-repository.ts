import { db } from '@/db';
import { categoryTable } from '@/db/schema';
import { CategoryDto } from '@/dto/category';

const categoryRepository = {
  async getAllCategories(): Promise<Array<CategoryDto>> {
    const data = await db.select().from(categoryTable).all();
    return data?.map(d => CategoryDto.parse(d));
  },
};

export default categoryRepository;
