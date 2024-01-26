import {
  Category,
  CategoryDetail,
  CategoryDetailInputType,
} from "@features/core/entity/Category.entity";

export type CategoryModel = { id: string; name: string };

type CategoryDetailModel = {
  id: string;
  categoryId: string;
  type: string;
  label: string;
  required: boolean;
};

const categories = new Map<string, CategoryModel>(
  [
    { id: "0", name: "Color" },
    { id: "1", name: "Pigment" },
  ].map((v) => [v.id, v])
);

const categoryDetails = new Map<string, CategoryDetailModel>(
  [
    {
      id: "0",
      categoryId: "0",
      type: "string",
      label: "Name",
      required: true,
    },
    {
      id: "1",
      categoryId: "0",
      type: "string",
      label: "Number",
      required: true,
    },
    {
      id: "2",
      categoryId: "1",
      type: "string",
      label: "Color",
      required: true,
    },
  ].map((v) => [v.id, v])
);

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

export const CategoryRepository = {
  getCategories,
  getCategoryDetails,
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
