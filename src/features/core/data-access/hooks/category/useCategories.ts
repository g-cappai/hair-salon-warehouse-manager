import { useSuspenseQuery } from "@tanstack/react-query";
import CategoryService from "../../service/CategoryService";
import { Category } from "@features/core/entity/Category.entity";

export function useCategories() {
  return useSuspenseQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
  });
}
