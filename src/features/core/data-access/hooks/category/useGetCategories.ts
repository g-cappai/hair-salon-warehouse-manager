import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../../service";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
  });
}
