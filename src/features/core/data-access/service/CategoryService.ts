import { Product } from "../../entity/Product.entity";
import { ProductRepository } from "../repository/product.in-memory.repository";

export const ProductService = {
  getProducts,
  getProductById,
  getProductByBarCode,
  createProduct,
  updateProduct,
  updateProductQuantity,
  deleteProductById,
};

async function getProducts(): Promise<Product[]> {
  return ProductRepository.getProducts();
}

async function getProductById(id: string): Promise<Product | null> {
  return ProductRepository.getProductById(id);
}

async function getProductByBarCode(barCode: string): Promise<Product | null> {
  return ProductRepository.getProductByBarCode(barCode);
}

export type ProductData = {
  name: string;
  barCode: string;
  //TODO:
  category: string;
};

async function createProduct(
  newProduct: Omit<Product, "id">
): Promise<Product> {
  return ProductRepository.insertProduct(newProduct);
}

async function updateProduct(updatedProduct: Product): Promise<Product> {
  return ProductRepository.updateProduct(updatedProduct);
}

async function updateProductQuantity(
  productId: string,
  newQuantity: number
): Promise<Product> {
  return ProductRepository.updateProductQuantity(productId, newQuantity);
}

async function deleteProductById(id: string): Promise<void> {
  return ProductRepository.deleteProduct(id);
}
