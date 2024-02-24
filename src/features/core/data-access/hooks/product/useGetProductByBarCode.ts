import { useSuspenseQuery } from "@tanstack/react-query";
import ProductService from "../../service/ProductService";

export function useGetProductByBarCode(barCode: string) {
  return useSuspenseQuery({
    queryKey: ["product", barCode],
    queryFn: () => ProductService.getProductByBarCode(barCode),
  });
}
