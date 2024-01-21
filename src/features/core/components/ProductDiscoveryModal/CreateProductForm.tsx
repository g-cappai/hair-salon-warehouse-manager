import { Button, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Input, Text } from "@features/ui/components";
import { Select } from "@features/ui/components";
import { useCreateProduct } from "@features/core/data-access/hooks/product";
import {
  useCategories,
  useCategoryDetails,
} from "@features/core/data-access/hooks/category";
import { useBrands } from "@features/core/data-access/hooks/brand";

type Props = {
  barCode: string;
  onSubmit: (submittedValues: { name: string; barCode: string }) => void;
};

type FormData = {
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
  details: { categoryDetailId: string; value: string }[];
};

export function CreateProductForm({ barCode, onSubmit }: Props) {
  const [formData, setFormData] = useState<FormData>({
    barCode,
    quantity: 1,
    brandId: "",
    categoryId: "",
    details: [] as { categoryDetailId: string; value: string }[],
  });

  const updateFormData = <T extends keyof FormData>(
    key: T,
    value: FormData[T]
  ) => {
    setFormData((c) => ({ ...c, [key]: value }));
  };

  const { mutate: createProduct } = useCreateProduct();

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data: categoryDetails } = useCategoryDetails(formData.categoryId);

  const handleSubmit = () => {
    createProduct({
      barCode,
      brandId: formData.brandId,
      categoryId: formData.categoryId,
      quantity: formData.quantity,
      details: formData.details,
    });
    onSubmit({ name: "productName", barCode });
  };

  return (
    <View>
      <View style={styles.header}>
        <Text variant="title">Prodotto non trovato</Text>
        <Text variant="body">Inserisci i dati del prodotto</Text>
      </View>
      <Input
        placeholder="Barcode"
        value={formData.barCode}
        onChange={(value) => updateFormData("barCode", value)}
      />
      <Input
        placeholder="Quantity"
        type="NUMERIC"
        value={formData.quantity.toString()}
        onChange={(value) => updateFormData("quantity", +value)}
      />
      <Select
        placeholder="Brand"
        data={brands?.map((b) => ({ label: b.name, value: b.id })) || []}
        selectedValue={formData.brandId}
        onChange={(value) => updateFormData("brandId", value as string)}
      />
      <Select
        placeholder="Category"
        data={categories?.map((c) => ({ label: c.name, value: c.id })) || []}
        selectedValue={formData.categoryId}
        onChange={(value) => updateFormData("categoryId", value as string)}
      />

      {categoryDetails?.map((categoryDetail) => {
        if (categoryDetail.type === "string") {
          const getCategoryDetailValue = () =>
            formData.details.find(
              (formDataDetail) =>
                formDataDetail.categoryDetailId === categoryDetail.id
            )?.value;

          const updateFormDataDetail = (value: string) => {
            return [
              ...formData.details.filter(
                (currentFormDataDetail) =>
                  currentFormDataDetail.categoryDetailId !== categoryDetail.id
              ),
              { categoryDetailId: categoryDetail.id, value },
            ];
          };

          return (
            <Input
              key={categoryDetail.id}
              placeholder={categoryDetail.label}
              value={getCategoryDetailValue() || ""}
              onChange={(value) =>
                updateFormData("details", updateFormDataDetail(value))
              }
            />
          );
        }
      })}
      <View style={styles.footer}>
        <Button title="CREATE" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: 10,
  },
  header: {
    paddingBottom: 10,
  },
});
