import { PopulatedProduct, Product } from "../../entity/Product.entity";
import {
  BrandRepository,
  CategoryRepository,
  ProductRepository,
} from "../repository";

async function getProducts(): Promise<Product[]> {
  return ProductRepository.getProducts();
}

async function getPopulatedProducts(): Promise<PopulatedProduct[]> {
  const products = await ProductRepository.getProducts();
  const categoryIds = Array.from(new Set(products.map((p) => p.categoryId)));
  const brandIds = Array.from(new Set(products.map((p) => p.brandId)));

  const categories = await CategoryRepository.getCategoriesByIds(categoryIds);
  const categoryDetails = await CategoryRepository.getCategoryDetailsByIds(
    categoryIds
  );
  const brands = await BrandRepository.getBrandsByIds(brandIds);

  const populatedProducts = products
    .map((product) => {
      const category = categories.find((c) => c.id === product.categoryId);
      const brand = brands.find((b) => b.id === product.brandId);
      const details = product.details.map((detail) => {
        const categoryDetail = categoryDetails.find(
          (cd) => cd.id === detail.categoryDetailId
        );

        if (!categoryDetail) return null;

        return {
          value: detail.value,
          categoryDetail: categoryDetail,
        };
      });

      if (!category || !brand || details.some((d) => d === null)) return null;
      const { id, barCode, quantity } = product;
      return {
        id,
        barCode,
        quantity,
        category: category,
        brand: brand,
        details,
      };
    })
    .filter((p) => p !== null) as PopulatedProduct[];

  return populatedProducts;
}

async function getProductById(id: string): Promise<Product | null> {
  return ProductRepository.getProductById(id);
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  return ProductRepository.getProductByBarCode(barCode);
}

type InsertProductParams = Omit<Product, "id">;

async function createProduct(
  newProduct: InsertProductParams
): Promise<Product> {
  return ProductRepository.insertProduct(newProduct);
}

type UpdateProductParams = Omit<Partial<Product>, "barCode"> & {
  id: Product["id"];
};

async function updateProduct(
  updatedData: UpdateProductParams
): Promise<Product> {
  return ProductRepository.updateProduct(updatedData);
}

async function updateProductQuantity(
  id: string,
  newQuantity: number
): Promise<Product> {
  return ProductRepository.updateProductQuantity(id, newQuantity);
}

async function deleteProductById(id: string): Promise<void> {
  return ProductRepository.deleteProduct(id);
}

export default {
  getProducts,
  getPopulatedProducts,
  getProductById,
  getProductByBarCode,
  createProduct,
  updateProduct,
  updateProductQuantity,
  deleteProductById,
};
