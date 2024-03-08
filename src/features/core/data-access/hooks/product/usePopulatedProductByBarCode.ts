import { useSuspenseQuery } from "@tanstack/react-query";
import ProductService from "../../service/ProductService";

export function usePopulatedProductByBarCode(barCode: string) {
  return useSuspenseQuery({
    queryKey: ["product", barCode],
    queryFn: () => ProductService.getPopulatedProductByBarCode(barCode),
  });
}
