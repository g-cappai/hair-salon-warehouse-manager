import { BrandModel } from "./brand.in-memory.repository";
import {
  CategoryDetailModel,
  CategoryModel,
} from "./category.in-memory.repository";
import { ProductModel } from "./product.in-memory.repository";

export const products = new Map<string, ProductModel>();

export function __setProducts(newProducts: ProductModel[]) {
  products.clear();
  for (const product of newProducts) {
    products.set(product.id, product);
  }
}

// -----------------------------------------------------

export const categories = new Map<string, CategoryModel>(
  [
    { id: "0", name: "Color" },
    { id: "1", name: "Pigment" },
  ].map((v) => [v.id, v])
);

export function __setCategories(newCategories: CategoryModel[]) {
  categories.clear();
  for (const category of newCategories) {
    categories.set(category.id, category);
  }
}

export const categoryDetails = new Map<string, CategoryDetailModel>(
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

export function __setCategoryDetails(
  newCategoryDetails: CategoryDetailModel[]
) {
  categoryDetails.clear();
  for (const categoryDetail of newCategoryDetails) {
    categoryDetails.set(categoryDetail.id, categoryDetail);
  }
}

// -----------------------------------------------------

export const brands = new Map<string, BrandModel>(
  [
    { id: "0", name: "Alfaparf" },
    { id: "1", name: "Evolution" },
  ].map((v) => [v.id, v])
);

export function __setBrands(newBrands: BrandModel[]) {
  brands.clear();
  for (const brand of newBrands) {
    brands.set(brand.id, brand);
  }
}

// -----------------------------------------------------

export function __seedInMemory() {
  __setProducts([
    {
      id: "1",
      barCode: "1234",
      quantity: 1,
      brandId: "1",
      categoryId: "1",
      details: [
        { categoryDetailId: "0", value: "cat.det.0.val" },
        { categoryDetailId: "1", value: "cat.det.1.val" },
      ],
    },
    {
      id: "2",
      barCode: "5678",
      quantity: 2,
      brandId: "2",
      categoryId: "2",
      details: [
        { categoryDetailId: "2", value: "cat.det.2.val" },
        { categoryDetailId: "3", value: "cat.det.3.val" },
      ],
    },
  ]);

  __setCategories([
    { id: "1", name: "cat.1" },
    { id: "2", name: "cat.2" },
  ]);

  __setCategoryDetails([
    {
      id: "0",
      categoryId: "1",
      type: "string",
      label: "cat.det.0.label",
      required: true,
    },
    {
      id: "1",
      categoryId: "1",
      type: "string",
      label: "cat.det.1.label",
      required: true,
    },
    {
      id: "2",
      categoryId: "2",
      type: "string",
      label: "cat.det.2.label",
      required: true,
    },
    {
      id: "3",
      categoryId: "2",
      type: "string",
      label: "cat.det.3.label",
      required: true,
    },
  ]);

  __setBrands([
    { id: "1", name: "brand.1" },
    { id: "2", name: "brand.2" },
  ]);
}
