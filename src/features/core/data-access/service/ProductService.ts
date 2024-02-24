import { Product } from "../../entity/Product.entity";
import { ProductRepository } from "../repository/product.in-memory.repository";

async function getProducts(): Promise<Product[]> {
  return ProductRepository.getProducts();
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
  getProductById,
  getProductByBarCode,
  createProduct,
  updateProduct,
  updateProductQuantity,
  deleteProductById,
};
