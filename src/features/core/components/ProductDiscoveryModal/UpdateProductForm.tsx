import { useBrand } from "@features/core/data-access/hooks/brand/useBrand";
import { useCategory } from "@features/core/data-access/hooks/category/useCategory";
import { useUpdateProductQuantity } from "@features/core/data-access/hooks/product";
import { Product } from "@features/core/entity/Product.entity";
import { useRouter } from "@features/navigation/hooks";
import { Button, Text } from "@features/ui/components";
import { StyleSheet, View } from "react-native";

type Props = {
  product: Product;
  onCancel: () => void;
};

export function UpdateProductForm({ product, onCancel }: Props) {
  const { mutate: updateProductQuantity } = useUpdateProductQuantity();
  const { data: category } = useCategory(product.categoryId);
  const { data: brand } = useBrand(product.brandId);

  const router = useRouter();

  // TODO: Add error: "Product found but category or brand not found"
  if (!category || !brand) {
    console.log("ProductDiscoveryModal: category or brand not found");
    return null;
  }

  const handleIncreaseByOne = () => {
    updateProductQuantity(
      { productId: product.id, newQuantity: product.quantity + 1 },
      { onSuccess: onCancel }
    );
  };

  const handleDecreaseByOne = () => {
    updateProductQuantity(
      { productId: product.id, newQuantity: product.quantity - 1 },
      { onSuccess: onCancel }
    );
  };

  const handleGoToProductPage = () => {
    router.push({
      pathname: "/warehouse/product/[id]",
      params: { id: product.id },
    });
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <View>
      <View style={styles.header}>
        <Text variant="title">Prodotto trovato!</Text>
        <Text variant="body">
          {`${category.name} ${brand.name} con codice: ${product.barCode} si trova in magazzino.`}
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button title="+1" onPress={handleIncreaseByOne} />
        <Button title="-1" onPress={handleDecreaseByOne} />
        <Button
          title="Vai al prodotto"
          onPress={handleGoToProductPage}
          variant="tertiary"
        />
        <Button title="Annulla" variant="secondary" onPress={handleCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    gap: 10,
  },
  header: {
    paddingBottom: 10,
  },
});
