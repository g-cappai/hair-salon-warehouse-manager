import { Stack } from "expo-router";

export default function WarehouseLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: "Magazzino" }} />
      <Stack.Screen name="product/[id]" />
    </Stack>
  );
}
