import categoryService from '@/services/category-service';

export default async function Categories() {
  const categories = await categoryService.getAllCategories();
  return categories?.map((category, index) => (
    <div key={index}>{category.name}</div>
  ));
}
