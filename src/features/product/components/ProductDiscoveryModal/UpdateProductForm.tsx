import { Button, View } from "react-native";
import { useUpdateProductQuantity } from "../../hooks/useUpdateProductQuantity";

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
      <Button title="Increase by one" onPress={handleIncreaseByOne} />
      <Button title="Decrease by one" onPress={handleDecreaseByOne} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
}
