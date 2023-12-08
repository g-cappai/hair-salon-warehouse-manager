import { Product } from "../../entity/Product.entity";
import { ProductRepository } from "../../repository/product.in-memory.repository";

export const ProductService = {
  async getProductByBarCode(barCode: string): Promise<Product | null> {
    return ProductRepository.getProductByBarCode(barCode);
  },

  async createProduct(productData: {
    name: string;
    barCode: string;
  }): Promise<Product> {
    return ProductRepository.insertProduct({
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
    return ProductRepository.updateProductQuantity(product.id, newQuantity);
  },
};
