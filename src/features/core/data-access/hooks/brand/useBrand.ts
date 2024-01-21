import { useQuery } from "@tanstack/react-query";
import { BrandService } from "../../service/BrandService";
import { Brand } from "@features/core/entity/Brand.entity";

export function useBrand(id: string) {
  return useQuery<Brand | null>({
    queryKey: ["brands"],
    queryFn: () => BrandService.getBrandById(id),
  });
}
