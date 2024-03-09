import { useBrands } from "@features/core/data-access/hooks/brand";
import { useCategories } from "@features/core/data-access/hooks/category";
import { ProductBasicInfo } from "./useProductForm";
import { useForm } from "@features/form/hooks";
import productBasicInfoSchema from "../../schema/productBasicInfo.schema";
import { useMemo } from "react";
import { PopulatedProduct } from "@features/core/entity/Product.entity";

export function useProductBasicInfo(
  barCode: string,
  product: PopulatedProduct | null
) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const basicInitialValues: ProductBasicInfo = {
    barCode,
    quantity: product?.quantity ?? 1,
    brandId: product?.brand.id ?? "",
    categoryId: product?.category.id ?? "",
  };

  const {
    triggerValidation: triggerBasicValidation,
    values: basicValues,
    setValue: setBasicValue,
    setTouched: setBasicTouched,
    errors: basicErrors,
    isValid: basicIsValid,
    reset: resetBasicForm,
  } = useForm({
    initialValues: basicInitialValues,
    schema: productBasicInfoSchema(),
  });

  return useMemo(
    () => ({
      brands,
      categories,
      basicValues,
      basicErrors,
      basicIsValid,
      setBasicValue,
      setBasicTouched,
      resetBasicForm,
      triggerBasicValidation,
    }),
    [
      brands,
      categories,
      basicValues,
      basicErrors,
      basicIsValid,
      setBasicValue,
      setBasicTouched,
      resetBasicForm,
      triggerBasicValidation,
    ]
  );
}
