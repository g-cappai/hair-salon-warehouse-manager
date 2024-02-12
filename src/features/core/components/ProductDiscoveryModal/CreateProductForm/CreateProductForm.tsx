import { Button, StyleSheet, View } from "react-native";
import { Text } from "@features/ui/components";
import { useCreateProduct } from "@features/core/data-access/hooks/product";
import {
  useCategories,
  useCategoryDetails,
} from "@features/core/data-access/hooks/category";
import { useBrands } from "@features/core/data-access/hooks/brand";
import { useForm } from "@features/form/hooks";
import { ProductBasicForm } from "./ProductbasicForm";
import productBasicInfoSchema from "./schema/productBasicInfo.schema";
import categoryDetailsInfoSchema from "./schema/categoryDetailsInfo.schema";
import { Input } from "@features/ui/components/input";

type Props = {
  barCode: string;
  onSubmit: () => void;
};

export type ProductBasicInfo = {
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
};

export function CreateProductForm({ barCode, onSubmit }: Props) {
  const { mutate: createProduct } = useCreateProduct();

  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const basicInitialValues: ProductBasicInfo = {
    barCode,
    quantity: 1,
    brandId: "",
    categoryId: "",
  };

  const {
    triggerValidation: triggerBasicValidation,
    values: basicValues,
    setValue: setBasicValue,
    setTouched: setBasicTouched,
    errors: basicErrors,
    isValid: basicIsValid,
  } = useForm({
    initialValues: basicInitialValues,
    schema: productBasicInfoSchema(),
  });

  const { data: categoryDetails } = useCategoryDetails(basicValues.categoryId);

  const detailsInitialValues =
    categoryDetails?.reduce<Record<string, string>>((acc, categoryDetail) => {
      acc[categoryDetail.id] = categoryDetail.defaultValue || "";
      return acc;
    }, {}) || {};

  const {
    triggerValidation: triggerDetailsValidation,
    values: detailsValues,
    setValue: setDetailsValue,
    setTouched: setDetailsTouched,
    errors: detailsErrors,
    isValid: detailsIsValid,
  } = useForm<Record<string, string>>({
    initialValues: detailsInitialValues,
    schema: categoryDetailsInfoSchema(categoryDetails),
  });

  const handleSubmit = () => {
    triggerBasicValidation();
    triggerDetailsValidation();
    if (!basicIsValid || !detailsIsValid) return;
    createProduct({
      barCode: basicValues.barCode,
      brandId: basicValues.brandId,
      categoryId: basicValues.categoryId,
      quantity: basicValues.quantity,
      details: Object.entries(detailsValues).map(
        ([categoryDetailId, value]) => ({
          categoryDetailId,
          value,
        })
      ),
    });
    onSubmit();
  };

  return (
    <View>
      <View style={styles.header}>
        <Text variant="title">Prodotto non trovato</Text>
        <Text variant="body">Inserisci i dati del prodotto</Text>
      </View>
      <ProductBasicForm
        {...{
          brands,
          categories,
          errors: basicErrors,
          setTouched: setBasicTouched,
          setValue: setBasicValue,
          values: basicValues,
        }}
      />

      {categoryDetails?.map((categoryDetail) => {
        if (categoryDetail.type === "string") {
          return (
            <Input
              key={categoryDetail.id}
              placeholder={categoryDetail.label}
              value={detailsValues[categoryDetail.id]}
              onChange={(value) => setDetailsValue(categoryDetail.id, value)}
              onBlur={setDetailsTouched(categoryDetail.id)}
              hasError={!!detailsErrors[categoryDetail.id]}
              errorMessage={detailsErrors[categoryDetail.id]?.message}
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
