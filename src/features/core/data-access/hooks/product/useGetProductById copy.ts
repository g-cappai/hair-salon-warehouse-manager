import { useQuery } from "@tanstack/react-query";
import ProductService from "../../service/ProductService";

export function usePopulatedProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });
}
