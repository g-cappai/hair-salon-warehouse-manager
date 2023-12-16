import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../service";

export function useDeleteProductById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductService.deleteProductById(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
}
