import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../../service";
import { Product } from "@features/core/entity/Product.entity";

type UseCreateProductParams = Omit<Product, "id">;

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: UseCreateProductParams) =>
      ProductService.createProduct(productData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
