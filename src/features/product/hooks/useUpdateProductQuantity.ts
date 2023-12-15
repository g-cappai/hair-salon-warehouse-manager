import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../service/product";

type UpdateProductQuantityParams = {
  productId: string;
  newQuantity: number;
};

//TODO: use const for the keys (react-query-kit??)

export function useUpdateProductQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, newQuantity }: UpdateProductQuantityParams) =>
      ProductService.updateProductQuantity(productId, newQuantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
