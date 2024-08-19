import { CategoryDto } from '@/dto/category';
import categoryRepository from '@/repository/category-repository';

const categoryService = {
  async getAllCategories() {
    const categories = await categoryRepository.getAllCategories();
    return categories.map(c => CategoryDto.parse(c));
  },
};

export default categoryService;
