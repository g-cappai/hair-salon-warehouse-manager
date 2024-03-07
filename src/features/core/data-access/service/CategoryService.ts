import {
  Category,
  CategoryDetail,
} from "@features/core/entity/Category.entity";
import { CategoryRepository } from "../repository/category.in-memory.repository";

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

const CategoryService = {
  getCategories,
  getCategoryDetails,
  getCategoryById,
};

export default CategoryService;
