import { useSuspenseQuery } from "@tanstack/react-query";
import { BrandService } from "../../service/BrandService";
import { Brand } from "@features/core/entity/Brand.entity";

export function useBrand(id: string) {
  return useSuspenseQuery<Brand | null>({
    queryKey: ["brand", id],
    queryFn: () => BrandService.getBrandById(id),
  });
}
