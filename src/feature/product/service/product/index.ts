import { Product } from "../../entity/Product.entity";
import { ProductRepository } from "../../repository/product.in-memory.repository";

export const ProductService = {
  getProducts,
  getProductByBarCode,
  createProduct,
  updateProductQuantity,
};

async function getProducts(): Promise<Product[]> {
  return ProductRepository.getProducts();
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  return ProductRepository.getProductByBarCode(barCode);
}

export type ProductData = {
  name: string;
  barCode: string;
};

async function createProduct(productData: ProductData): Promise<Product> {
  return ProductRepository.insertProduct({
    barCode: productData.barCode,
    name: productData.name,
    quantity: 1,
  });
}

async function updateProductQuantity(
  productId: string,
  newQuantity: number
): Promise<Product> {
  return ProductRepository.updateProductQuantity(productId, newQuantity);
}
