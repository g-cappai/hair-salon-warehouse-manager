import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductService } from "../../service";

export function useGetProductByBarCode(barCode: string) {
  return useSuspenseQuery({
    queryKey: ["product", barCode],
    queryFn: () => ProductService.getProductByBarCode(barCode),
  });
}
