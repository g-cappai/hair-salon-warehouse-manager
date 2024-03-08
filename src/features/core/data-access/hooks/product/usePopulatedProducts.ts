import { useQuery } from "@tanstack/react-query";
import ProductService from "../../service/ProductService";

export function usePopulatedProducts() {
  return useQuery({
    queryKey: ["products", "populated"],
    queryFn: () => ProductService.getPopulatedProducts(),
  });
}
