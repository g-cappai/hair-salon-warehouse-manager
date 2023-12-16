import { Product } from "../../entity/Product.entity";
import { ProductRepository } from "../repository/product.in-memory.repository";

/* 
SERVICE LAYER MAY BE SUPERFLOUS
At the moment this is just a proxy between hooks and repository
doesn't really add nothing.
I should evaluate it when i'll had added all the saving logics

HERE may happen the double writing (to the db and the conversion to a sheet).

IF in the hand this will still be just a proxy or some kind of DI container, can be removed
*/

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
