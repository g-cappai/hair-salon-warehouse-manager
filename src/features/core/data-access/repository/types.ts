import { Brand } from "@features/core/entity/Brand.entity";
import {
  Category,
  CategoryDetail,
} from "@features/core/entity/Category.entity";
import { Product } from "@features/core/entity/Product.entity";

export type InsertProductParams = Omit<Product, "id">;
export type UpdateProductParams = Partial<Product> & { id: Product["id"] };

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductByBarCode(barCode: string): Promise<Product | null>;
  insertProduct(newProduct: InsertProductParams): Promise<Product>;
  updateProduct(updatedProductData: UpdateProductParams): Promise<Product>;
  updateProductQuantity(id: string, newQuantity: number): Promise<Product>;
  deleteProduct(id: string): void;
}

export interface IBrandRepository {
  getBrandById: (id: string) => Promise<Brand | null>;
  getBrands: () => Promise<Brand[]>;
  getBrandsByIds: (ids: string[]) => Promise<Brand[]>;
}

export interface ICategoryRepository {
  getCategories: () => Promise<Category[]>;
  getCategoryDetails: (categoryId: string) => Promise<CategoryDetail[]>;
  getCategoryDetailsByCategoryIds: (
    categoryIds: string[]
  ) => Promise<CategoryDetail[]>;
  getCategoryById: (categoryId: string) => Promise<Category | null>;
  getCategoriesByIds: (categoryIds: string[]) => Promise<Category[]>;
}
