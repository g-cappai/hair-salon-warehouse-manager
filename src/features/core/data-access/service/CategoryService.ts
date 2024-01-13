import {
  Category,
  CategoryDetail,
} from "@features/core/entity/Category.entity";
import { CategoryRepository } from "../repository/category.in-memory.repository";

export const CategoryService = {
  getCategories,
  getCategoryDetails,
  getCategoryById, // Added getCategoryById function
};

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
