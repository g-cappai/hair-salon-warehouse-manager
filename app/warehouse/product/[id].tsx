import { Link } from "@features/navigation/components";
import { useRouter } from "@features/navigation/hooks";
import { useDeleteProductById } from "@features/product/data-access/hooks/useDeleteProductById";
import { useUpdateProduct } from "@features/product/data-access/hooks/useUpdateProduct";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useGetProductById } from "src/features/product/data-access/hooks/useGetProductById";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isFetching } = useGetProductById(id);
  const {
    mutate: updateProduct,
    isPending: isSaving,
    isSuccess: isUpdated,
  } = useUpdateProduct();
  const {
    mutate: deleteProductById,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteProductById();
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // TODO: replace with a reducer
  const [name, setName] = useState("");
  const [barCode, setBarCode] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (product && isUpdateMode) {
      setName(product?.name);
      setBarCode(product?.barCode);
      setQuantity(product?.quantity.toString());
    }
  }, [isUpdateMode]);

  useEffect(() => {
    if (isUpdated || isDeleted) {
      router.canGoBack() ? router.back() : router.push("/warehouse/");
    }
  });

  if (isFetching && !isUpdateMode) {
    return <Text>Is loading...</Text>;
  }

  if (!product) {
    return (
      <View>
        <Text>An error as occurred </Text>
        <Link href={"/warehouse/"}>
          <Text>Go Back</Text>
        </Link>
      </View>
    );
  }

  /*
  TODO:
  - I need a updateProduct to update the whole product informations
  - I want a button to delete the item
  */

  return (
    <View>
      {isUpdateMode ? (
        <TextInput value={name} onChangeText={setName} />
      ) : (
        <Text>{product.name}</Text>
      )}
      {isUpdateMode ? (
        <TextInput value={barCode} onChangeText={setBarCode} />
      ) : (
        <Text>{product.barCode}</Text>
      )}
      {isUpdateMode ? (
        <TextInput value={quantity} onChangeText={setQuantity} />
      ) : (
        <Text>{product.quantity}</Text>
      )}
      {isUpdateMode && (
        <Button
          title="SAVE"
          disabled={isSaving}
          onPress={() =>
            updateProduct({
              id: product.id,
              name,
              barCode,
              quantity: +quantity,
            })
          }
        />
      )}
      <Button
        title="TOGGLE UPDATE"
        disabled={isSaving || isDeleting}
        onPress={() => setIsUpdateMode((c) => !c)}
      />
      {!isUpdateMode && (
        <Button
          title="DELETE"
          disabled={isDeleting}
          onPress={() => {
            deleteProductById(product.id);
          }}
        />
      )}
    </View>
  );
}
