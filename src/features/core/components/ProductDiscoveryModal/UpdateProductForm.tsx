import { useUpdateProductQuantity } from "@features/core/data-access/hooks/product";
import { Link } from "@features/navigation/components";
import { Text } from "@features/ui/components";
import { Button, StyleSheet, View } from "react-native";
type Props = {
  productId: string;
  currentQuantity: number;
  onCancel: () => void;
};

export function UpdateProductForm({
  productId,
  currentQuantity,
  onCancel,
}: Props) {
  const { mutate: updateProductQuantity } = useUpdateProductQuantity();

  const handleIncreaseByOne = () => {
    updateProductQuantity(
      { productId, newQuantity: currentQuantity + 1 },
      { onSuccess: onCancel }
    );
  };

  const handleDecreaseByOne = () => {
    updateProductQuantity(
      { productId, newQuantity: currentQuantity - 1 },
      { onSuccess: onCancel }
    );
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <View>
      <View style={styles.header}>
        <Text variant="title">Prodotto trovato!</Text>
        <Text variant="body">
          Il prodotto si trova in magazzino. Cosa vuoi fare?
        </Text>
      </View>
      <Button title="+1" onPress={handleIncreaseByOne} />
      <Button title="-1" onPress={handleDecreaseByOne} />
      <Link
        href={{
          pathname: "/warehouse/product/[id]",
          params: { id: productId },
        }}
      >
        <Button title="Vai al prodotto" onPress={onCancel} />
      </Link>
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
});
