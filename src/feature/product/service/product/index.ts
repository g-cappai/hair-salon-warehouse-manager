import { Product } from "../../entity/Product.entity";
import { ProductRepository } from "../../repository/product.in-memory.repository";

export const ProductService = {
  getProductByBarCode,
  createProduct,
  updateProductQuantity,
};

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
