import {
  Category,
  CategoryDetail,
  CategoryDetailType,
} from "../../entity/Product.entity";

type CategoryModel = { _id: string; name: string };
type CategoryDetailModel = {
  _id: string;
  categoryId: string;
  type: string;
  label: string;
};

const categories = new Map<string, CategoryModel>();

const categoryDetails = new Map<string, CategoryDetailModel>();

// -----------------------------------------------------------------------------

async function getCategories(): Promise<Category[]> {
  const everyCategory = Array.from(categories.values());

  return everyCategory.map((cat) => ({
    ...cat,
    id: cat._id,
  }));
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
    id: cd._id,
    type: cd.type as CategoryDetailType,
  }));
}

export const CategoryRepository = { getCategories, getCategoryDetails };

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
