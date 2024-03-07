import {
  Category,
  CategoryDetail,
} from "@features/core/entity/Category.entity";
import CategoryService from "../CategoryService";

const mockCategories: Category[] = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
];

const mockCategoryDetails: CategoryDetail[] = [
  {
    id: "1",
    categoryId: "1",
    type: "string",
    label: "Category 1 Name",
    required: true,
  },
  {
    id: "2",
    categoryId: "1",
    type: "string",
    label: "Category 1 Number",
    required: true,
  },
  {
    id: "3",
    categoryId: "2",
    type: "string",
    label: "Category 2 Name",
    required: true,
  },
  {
    id: "4",
    categoryId: "2",
    type: "string",
    label: "Category 2 Number",
    required: true,
  },
];

async function getCategories(): Promise<Category[]> {
  return mockCategories;
}

async function getCategoryDetails(
  categoryId: string
): Promise<CategoryDetail[]> {
  return mockCategoryDetails.filter(
    (detail) => detail.categoryId === categoryId
  );
}

async function getCategoryById(categoryId: string): Promise<Category | null> {
  return mockCategories.find((category) => category.id === categoryId) || null;
}

export default {
  getCategories,
  getCategoryDetails,
  getCategoryById,
} as typeof CategoryService;
