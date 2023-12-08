import { Product } from "../../entity/Product.entity";
import { productRepository } from "../../repository/product.in-memory.repository";

export const ProductService = {
  async getProductByBarCode(barCode: string): Promise<Product | null> {
    return productRepository.getProductByBarCode(barCode);
  },

  async createProduct(productData: {
    name: string;
    barCode: string;
  }): Promise<Product> {
    return productRepository.insertProduct({
      barCode: productData.barCode,
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
