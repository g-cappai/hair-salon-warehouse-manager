import { Text } from "react-native";
import { List } from "src/features/ui/components";
import { useGetProducts } from "../../data-access/hooks/useGetProducts";

export function WarehouseList() {
  const { data: products } = useGetProducts();
  /*
  TODO:
  - I want to press a list item to display its informations
  - I need a updateProduct to update the whole product informations
  - I want a button to delete the item
  */
  return (
    <List
      data={products}
      renderItem={({ item }) => (
        <Text>{`Name: ${item.name} Quantity: ${item.quantity}`}</Text>
      )}
    />
  );
}
