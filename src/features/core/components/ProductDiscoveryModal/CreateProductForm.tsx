import { Button, View } from "react-native";
import { useState } from "react";
import { Input } from "@features/ui/components";
import { Select } from "@features/ui/components";
import { useCreateProduct } from "@features/core/data-access/hooks/product";
import { Brand } from "@features/core/entity/Product.entity";
import { useGetCategories } from "@features/core/data-access/hooks/category/useGetCategories";
import { useGetCategoryDetails } from "@features/core/data-access/hooks/category";

type Props = {
  barCode: string;
  onSubmit: (submittedValues: { name: string; barCode: string }) => void;
};

const BRANDS: Brand[] = [
  { id: "0", name: "Alfaparf" },
  { id: "1", name: "Evolution" },
];

export function CreateProductForm({ barCode, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    barCode,
    quantity: 1,
    brandId: "",
    categoryId: "",
    details: [] as { categoryDetailId: string; value: string }[],
  });
  const { mutate: createProduct } = useCreateProduct();
  const { data: categories } = useGetCategories();
  const { data: categoryDetails } = useGetCategoryDetails({
    categoryId: formData.categoryId,
  });

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
      <Input
        placeholder="Barcode"
        value={formData.barCode}
        onChange={(value) => setFormData((c) => ({ ...c, barCode: value }))}
      />
      <Input
        placeholder="Quantity"
        type="NUMERIC"
        value={formData.quantity.toString()}
        onChange={(value) => setFormData((c) => ({ ...c, quantity: +value }))}
      />
      <Select
        placeholder="Brand"
        data={BRANDS.map((b) => ({ label: b.name, value: b.id }))}
        selectedValue={formData.brandId}
        onChange={(value) =>
          setFormData((c) => ({ ...c, brandId: value as string }))
        }
      />
      <Select
        placeholder="Category"
        data={categories?.map((c) => ({ label: c.name, value: c.id })) || []}
        selectedValue={formData.categoryId}
        onChange={(value) => {
          setFormData((c) => ({ ...c, categoryId: value as string }));
        }}
      />

      {categoryDetails?.map((categoryDetail) => {
        if (categoryDetail.type === "string") {
          return (
            <Input
              key={categoryDetail.id}
              placeholder={categoryDetail.label}
              value={
                formData.details.find(
                  (formDataDetail) =>
                    formDataDetail.categoryDetailId === categoryDetail.id
                )?.value || ""
              }
              onChange={(value) =>
                setFormData((currentFormData) => ({
                  ...currentFormData,
                  details: [
                    ...currentFormData.details.filter(
                      (currentFormDataDetail) =>
                        currentFormDataDetail.categoryDetailId !==
                        categoryDetail.id
                    ),
                    { categoryDetailId: categoryDetail.id, value },
                  ],
                }))
              }
            />
          );
        }
      })}
      <Button title="CREATE" onPress={handleSubmit} />
    </View>
  );
}
