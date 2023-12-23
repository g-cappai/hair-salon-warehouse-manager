import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../../service";
import { Product } from "@features/core/entity/Product.entity";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => ProductService.updateProduct(product),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
}
