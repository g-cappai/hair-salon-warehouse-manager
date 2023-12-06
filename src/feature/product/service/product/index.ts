import { Product } from "../../entity/Product.entity";
import { productRepository } from "../../repository/product.in-memory.repository";

export const productService = {
  async getProductByBarcode(barcode: string): Promise<Product | null> {
    return productRepository.getProductByBarcode(barcode);
  },

  async createProduct(productData: {
    name: string;
    barcode: string;
  }): Promise<Product> {
    return productRepository.insertProduct({
      barcode: productData.barcode,
      name: productData.name,
      quantity: 1,
    });
  },

  async increaseQuantity(
    product: Product,
    quantityToIncrease: number
  ): Promise<Product> {
    const newQuantity = product.quantity + quantityToIncrease;
    return productRepository.updateProductQuantity(product.id, newQuantity);
  },
};
