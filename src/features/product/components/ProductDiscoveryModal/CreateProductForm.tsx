import { Button, TextInput, View } from "react-native";
import { useState } from "react";
import { useCreateProduct } from "../../data-access/hooks/useCreateProduct";

type Props = {
  barCode: string;
  onSubmit: (submittedValues: { name: string; barCode: string }) => void;
};

export function CreateProductForm({ barCode, onSubmit }: Props) {
  const { mutate: createProduct } = useCreateProduct();

  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    //TODO We need every product property
    createProduct({ barCode, category: "bleach", brand: "Test", quantity: 1 });
    onSubmit({ name: productName, barCode });
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={setProductName} />
      <Button title="CREATE" onPress={handleSubmit} />
    </View>
  );
}
