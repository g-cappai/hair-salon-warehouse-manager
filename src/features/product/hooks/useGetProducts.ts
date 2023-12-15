import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../service/product";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
  });
}
