import { useMutation } from "@tanstack/react-query";
import { ProductService } from "../service/product";

type UpdateProductQuantityParams = {
  productId: string;
  newQuantity: number;
};

export function useUpdateProductQuantity() {
  return useMutation({
    mutationFn: ({ productId, newQuantity }: UpdateProductQuantityParams) =>
      ProductService.updateProductQuantity(productId, newQuantity),
  });
}
