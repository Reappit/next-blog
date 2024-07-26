'use server';
import { getAllCategories } from '@/repository/category-repository';

export default async function Categories() {
  const categories = await getAllCategories();
  return categories?.map((category, index) => (
    <div key={index}>{category.name}</div>
  ));
}
