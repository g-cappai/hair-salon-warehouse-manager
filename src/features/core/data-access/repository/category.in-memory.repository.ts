import {
  Category,
  CategoryDetail,
  CategoryDetailType,
} from "../../entity/Product.entity";

type CategoryModel = { id: string; name: string };
type CategoryDetailModel = {
  id: string;
  categoryId: string;
  type: string;
  label: string;
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
    },
    {
      id: "1",
      categoryId: "0",
      type: "string",
      label: "Number",
    },
    {
      id: "2",
      categoryId: "1",
      type: "string",
      label: "Color",
    },
  ].map((v) => [v.id, v])
);

// -----------------------------------------------------------------------------

async function getCategories(): Promise<Category[]> {
  const everyCategory = Array.from(categories.values());

  return everyCategory.map((cat) => ({
    ...cat,
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
