import { Category, CategoryDetail } from "../../entity/Product.entity";
import { CategoryRepository } from "../repository/category,in-memory.repository";

export const CategoryService = {
  getCategories,
  getCategoryDetails,
};

async function getCategories(): Promise<Category[]> {
  return CategoryRepository.getCategories();
}

async function getCategoryDetails(
  categoryId: string
): Promise<CategoryDetail[]> {
  return CategoryRepository.getCategoryDetails(categoryId);
}
