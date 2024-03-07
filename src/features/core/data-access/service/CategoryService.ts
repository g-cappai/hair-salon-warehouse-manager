import {
  Category,
  CategoryDetail,
} from "@features/core/entity/Category.entity";
import { CategoryRepository } from "../repository";

async function getCategories(): Promise<Category[]> {
  return CategoryRepository.getCategories();
}

async function getCategoryDetails(
  categoryId: string
): Promise<CategoryDetail[]> {
  return CategoryRepository.getCategoryDetails(categoryId);
}

async function getCategoryById(categoryId: string): Promise<Category | null> {
  return CategoryRepository.getCategoryById(categoryId);
}

async function getCategoriesByIds(categoryIds: string[]): Promise<Category[]> {
  const categories: Category[] = [];
  for (const categoryId of categoryIds) {
    const category = await CategoryRepository.getCategoryById(categoryId);
    if (category) {
      categories.push(category);
    }
  }
  return categories;
}

const CategoryService = {
  getCategories,
  getCategoryDetails,
  getCategoryById,
  getCategoriesByIds,
};

export default CategoryService;
