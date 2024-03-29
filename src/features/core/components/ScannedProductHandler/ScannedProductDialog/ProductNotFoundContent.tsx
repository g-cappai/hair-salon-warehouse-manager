import { Button, Text, View } from "@features/ui/components";
import { StyleSheet } from "react-native";

type Props = {
  barCode: string;
  onCreateProduct: () => void;
  onCancel: () => void;
};

export function ProductNotFoundContent({
  barCode,
  onCreateProduct,
  onCancel,
}: Props) {
  return (
    <View testID="product-not-found-content">
      <View style={styles.header}>
        <Text variant="title">Prodotto non trovato!</Text>
        <Text variant="body">
          Il prodotto con codice &quot;{barCode}&quot; non è stato trovato in
          magazzino.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button onPress={onCreateProduct} title="Crea prodotto" />
        <Button variant="secondary" onPress={onCancel} title="Annulla" />
      </View>
    </View>
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
