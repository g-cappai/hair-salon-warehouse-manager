import { useQuery } from "@tanstack/react-query";
import ProductService from "../../service/ProductService";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
  });
}
