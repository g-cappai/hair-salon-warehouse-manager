import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../../service";

type CreateProductParams = {
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
  details: {
    categoryDetailId: string;
    value: string;
  }[];
};

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: CreateProductParams) =>
      ProductService.createProduct(productData),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", product.id] });
    },
  });
}
