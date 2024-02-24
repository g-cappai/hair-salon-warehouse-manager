import { Button, Modal, Text, View } from "@features/ui/components";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { useProductForm } from "../ProductForm/hooks/useProductForm";
import { ProductForm } from "../ProductForm";
import { ScrollView } from "react-native-gesture-handler";
import { useCreateProduct } from "../../data-access/hooks/product";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  barCode: string;
};

export function CreateProductModal({ isOpen, onClose, barCode }: Props) {
  const { handleSubmit, reset, form } = useProductForm({ barCode });
  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  const handleCreate = async () => {
    if (isPending) return;

    handleSubmit(
      async ({ barCode, brandId, categoryId, quantity, details }) => {
        try {
          await createProduct({
            barCode,
            brandId,
            categoryId,
            quantity,
            details,
          });
          reset();
          onClose();
        } catch (error) {
          // TODO: handle error and loading state
          console.error(error);
        }
      }
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <KeyboardAvoidingView style={styles.content}>
        <View>
          <Text variant="title">Create a new product</Text>
        </View>

        <ScrollView>
          <ProductForm form={form} />
        </ScrollView>

        <View style={styles.footer}>
          <Button onPress={handleCreate} title="Crea" />
          <Button variant="secondary" onPress={handleClose} title="Annulla" />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    height: "100%",
    maxHeight: "100%",
  },
  footer: {
    gap: 10,
  },
});
