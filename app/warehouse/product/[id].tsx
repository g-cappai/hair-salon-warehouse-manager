import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { useGetProductById } from "src/features/product/data-access/hooks/useGetProductById";

export default function WarehousePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product } = useGetProductById(id);
  return <Text>{product?.name}</Text>;
}
