import { Brand } from "./Brand.entity";
import { Category, CategoryDetail } from "./Category.entity";

export type Product = {
  id: string;
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
  details: ProductDetail[];
};

export type ProductDetail = {
  categoryDetailId: string;
  value: string;
};

export type PopulatedProduct = Product & {
  brand: Brand;
  category: Category;
  details: PopulatedProductDetail[];
};

export type PopulatedProductDetail = ProductDetail & {
  categoryDetail: CategoryDetail;
};
