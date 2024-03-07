import {
  useDeleteProductById,
  useGetProductById,
  useUpdateProduct,
} from "@features/core/data-access/hooks/product";
import { Link } from "@features/navigation/components";
import { useRouter } from "@features/navigation/hooks";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
  const [barCode, setBarCode] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (product && isUpdateMode) {
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
      <Stack.Screen options={{ title: `Prod. ${product.id}` }} />

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
              barCode,
              quantity: +quantity,
              category: "oxygen",
              brand: "Alfaparf",
              volumes: "1000",
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
