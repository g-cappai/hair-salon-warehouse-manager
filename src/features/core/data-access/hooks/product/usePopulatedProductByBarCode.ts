import { useSuspenseQuery } from "@tanstack/react-query";
import ProductService from "../../service/ProductService";

export function usePopulatedProductByBarCode(barCode: string) {
  return useSuspenseQuery({
    queryKey: ["product", barCode, "populated"],
    queryFn: () => ProductService.getPopulatedProductByBarCode(barCode),
  });
}
