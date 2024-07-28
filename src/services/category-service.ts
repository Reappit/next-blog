import categoryRepository from '@/repository/category-repository';
import { CategoryDto } from '@/dto/category';

const categoryService = {
  async getAllCategories() {
    const categories = await categoryRepository.getAllCategories();
    return categories.map(c => CategoryDto.parse(c));
  },
};

export default categoryService;
