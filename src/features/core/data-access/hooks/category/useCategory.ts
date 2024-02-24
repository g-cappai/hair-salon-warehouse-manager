import { useSuspenseQuery } from "@tanstack/react-query";
import CategoryService from "../../service/CategoryService";
import { Category } from "@features/core/entity/Category.entity";

export function useCategory(id: string) {
  return useSuspenseQuery<Category | null>({
    queryKey: ["category", id],
    queryFn: () => CategoryService.getCategoryById(id),
  });
}
