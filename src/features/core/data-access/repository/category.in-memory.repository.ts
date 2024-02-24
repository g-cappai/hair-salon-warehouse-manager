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
    { id: "3", categoryId: "0", type: "string", label: "Size", required: true },
    {
      id: "4",
      categoryId: "0",
      type: "string",
      label: "Brand",
      required: true,
    },
    {
      id: "5",
      categoryId: "0",
      type: "string",
      label: "Manufacturer",
      required: true,
    },
    {
      id: "6",
      categoryId: "0",
      type: "string",
      label: "Description",
      required: true,
    },
    {
      id: "7",
      categoryId: "0",
      type: "string",
      label: "Price",
      required: true,
    },
    {
      id: "8",
      categoryId: "0",
      type: "string",
      label: "Quantity",
      required: true,
    },
    {
      id: "9",
      categoryId: "0",
      type: "string",
      label: "Weight",
      required: true,
    },
    {
      id: "10",
      categoryId: "0",
      type: "string",
      label: "Expiration Date",
      required: true,
    },
    {
      id: "11",
      categoryId: "0",
      type: "string",
      label: "Country of Origin",
      required: true,
    },
    {
      id: "12",
      categoryId: "0",
      type: "string",
      label: "Ingredients",
      required: true,
    },
    {
      id: "13",
      categoryId: "0",
      type: "string",
      label: "Country of Origin2",
      required: true,
    },
    {
      id: "14",
      categoryId: "0",
      type: "string",
      label: "Ingredients2",
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
