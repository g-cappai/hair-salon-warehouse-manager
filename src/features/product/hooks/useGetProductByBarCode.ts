import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../service/product";

export function useGetProductByBarCode(barCode: string) {
  return useQuery({
    queryKey: ["product", barCode],
    queryFn: () => ProductService.getProductByBarCode(barCode),
    enabled: !!barCode,
  });
}
