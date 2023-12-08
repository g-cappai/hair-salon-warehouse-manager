import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../service/product";

export function useGetProductByBarCode(barCode: string) {
  return useQuery({
    queryKey: ["products", barCode],
    queryFn: () => ProductService.getProductByBarCode(barCode),
  });
}
