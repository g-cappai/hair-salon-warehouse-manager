import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../../service";

type UseGetCategoryDetailsParams = { categoryId: string };

export function useGetCategoryDetails({
  categoryId,
}: UseGetCategoryDetailsParams) {
  return useQuery({
    queryKey: ["category", categoryId, "details"],
    queryFn: () => CategoryService.getCategoryDetails(categoryId),
    enabled: !!categoryId,
  });
}
