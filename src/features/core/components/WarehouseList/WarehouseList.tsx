import { Pressable, Text } from "react-native";
import { List } from "src/features/ui/components";
import { Link } from "@features/navigation/components";
import { useGetProducts } from "@features/core/data-access/hooks";

export function WarehouseList() {
  const { data: products } = useGetProducts();

  return (
    <List
      data={products}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/warehouse/product/[id]",
            params: { id: item.id },
          }}
        >
          <Pressable>
            <Text>{`Barcode: ${item.barCode} Quantity: ${item.quantity}`}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}
