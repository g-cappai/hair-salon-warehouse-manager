import { useUpdateProductQuantity } from "@features/core/data-access/hooks/product";
import { Product } from "@features/core/entity/Product.entity";
import { Button, Text } from "@features/ui/components";
import { StyleSheet, View } from "react-native";

type Props = {
  product: Product;
  onUpdateProduct: () => void;
  onClose: () => void;
};

export function ProductFoundContent({
  product,
  onUpdateProduct,
  onClose,
}: Props) {
  const { mutate: updateProductQuantity } = useUpdateProductQuantity();

  const handleIncreaseByOne = () => {
    updateProductQuantity(
      { productId: product.id, newQuantity: product.quantity + 1 },
      { onSuccess: onClose }
    );
  };

  const handleDecreaseByOne = () => {
    updateProductQuantity(
      { productId: product.id, newQuantity: product.quantity - 1 },
      { onSuccess: onClose }
    );
  };

  const handleGoToProductPage = () => {
    onUpdateProduct();
    onClose();
  };

  return (
    <>
      <View style={styles.header}>
        <Text variant="title">Prodotto trovato!</Text>
        <Text variant="body">
          Il prodotto con codice &quot;{product.barCode}&quot; si trova in
          magazzino.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button title="+1" onPress={handleIncreaseByOne} />
        <Button title="-1" onPress={handleDecreaseByOne} />
        <Button variant="secondary" onPress={onClose} title="Annulla" />
        <Button
          variant="tertiary"
          onPress={handleGoToProductPage}
          title="Vai al prodotto"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: 10,
    paddingTop: 10,
  },
  header: {
    paddingBottom: 10,
  },
});
