import { useSuspenseQuery } from "@tanstack/react-query";
import CategoryService from "../../service/CategoryService";
import { CategoryDetail } from "@features/core/entity/Category.entity";

export function useCategoryDetails(categoryId: string) {
  return useSuspenseQuery<CategoryDetail[]>({
    queryKey: ["category", categoryId, "details"],
    queryFn: () => CategoryService.getCategoryDetails(categoryId),
  });
}
