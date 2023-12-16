import { useRouter } from "expo-router";
import { WarehouseList } from "src/features/product/components/WarehouseList";

export default function WarehousePage() {
  const router = useRouter();

  return (
    <WarehouseList
      onPressRow={(product) => {
        router.push(`/warehouse/product/${product.id}`);
      }}
    />
  );
}
