import { List } from "src/features/ui/components";
import { usePopulatedProducts } from "@features/core/data-access/hooks/product/usePopulatedProducts";
import { WarehouseListItem } from "./WarehouseListItem";

export function WarehouseList() {
  const { data: products } = usePopulatedProducts();

  return (
    <List
      data={products}
      renderItem={({ item }) => <WarehouseListItem product={item} />}
    />
  );
}
