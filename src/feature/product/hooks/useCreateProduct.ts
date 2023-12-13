import { useMutation } from "@tanstack/react-query";
import { ProductData, ProductService } from "../service/product";

export function useCreateProduct() {
  return useMutation({
    mutationFn: (productData: ProductData) =>
      ProductService.createProduct(productData),
  });
}
