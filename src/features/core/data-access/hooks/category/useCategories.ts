import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoryService } from "../../service";
import { Category } from "@features/core/entity/Category.entity";

export function useCategories() {
  return useSuspenseQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
  });
}
