import { useSuspenseQuery } from "@tanstack/react-query";
import BrandService from "../../service/BrandService";
import { Brand } from "@features/core/entity/Brand.entity";

export function useBrands() {
  return useSuspenseQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () => BrandService.getBrands(),
  });
}
