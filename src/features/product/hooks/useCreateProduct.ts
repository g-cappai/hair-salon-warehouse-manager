import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductData, ProductService } from "../service/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: ProductData) =>
      ProductService.createProduct(productData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
