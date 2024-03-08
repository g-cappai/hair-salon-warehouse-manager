import {
  Category,
  CategoryDetail,
  CategoryDetailInputType,
} from "@features/core/entity/Category.entity";
import { ICategoryRepository } from "./types";
import { categories, categoryDetails } from "./in-memory.data";

export type CategoryModel = { id: string; name: string };

export type CategoryDetailModel = {
  id: string;
  categoryId: string;
  type: string;
  label: string;
  required: boolean;
};

// -----------------------------------------------------------------------------

async function getCategories(): Promise<Category[]> {
  const everyCategory = Array.from(categories.values());

  return everyCategory.map((cat) => {
    return {
      ...cat,
    };
  });
}

async function getCategoryDetails(
  categoryId: string
): Promise<CategoryDetail[]> {
  const everyCategoryDetail = Array.from(categoryDetails.values());
  const filteredCategoryDetails = everyCategoryDetail.filter(
    (cd) => cd.categoryId === categoryId
  );

  return filteredCategoryDetails.map((cd) => ({
    ...cd,
    type: cd.type as CategoryDetailInputType,
  }));
}

async function getCategoryDetailsByCategoryIds(
  categoryIds: string[]
): Promise<CategoryDetail[]> {
  const categoryDetailsByIds: CategoryDetail[] = [];
  for (const categoryId of categoryIds) {
    const categoryDetails = await getCategoryDetails(categoryId);
    categoryDetailsByIds.push(...categoryDetails);
  }
  return categoryDetailsByIds;
}

async function getCategoryById(categoryId: string): Promise<Category | null> {
  const category = categories.get(categoryId);

  if (category) {
    return { ...category };
  }

  return null;
}

async function getCategoriesByIds(categoryIds: string[]): Promise<Category[]> {
  const categoriesByIds: Category[] = [];

  categoryIds.forEach((categoryId) => {
    const category = categories.get(categoryId);
    if (category) {
      categoriesByIds.push({
        ...category,
      });
    }
  });

  return categoriesByIds;
}

export const CategoryRepository: ICategoryRepository = {
  getCategories,
  getCategoryDetails,
  getCategoryDetailsByCategoryIds,
  getCategoryById,
  getCategoriesByIds,
};

// -----------------------------------------------------

export class RepositoryError extends Error {
  status: ServiceErrorStatus;

  constructor(status: ServiceErrorStatus) {
    super(status);
    this.status = status;
  }
}

export enum ServiceErrorStatus {
  EXISTING_PRODUCT = "EXISTING_PRODUCT",
  EXISTING_UPDATED_BARCODE = "EXISTING_UPDATED_BARCODE",
  PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
}
