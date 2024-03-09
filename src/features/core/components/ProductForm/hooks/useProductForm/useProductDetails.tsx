import { useCategoryDetails } from "@features/core/data-access/hooks/category";
import categoryDetailsInfoSchema from "../../schema/categoryDetailsInfo.schema";
import { useForm } from "@features/form/hooks";
import { useMemo } from "react";

export function useProductDetails(selectedCategoryId: string) {
  const { data: categoryDetails } = useCategoryDetails(selectedCategoryId);

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

  return useMemo(
    () => ({
      categoryDetails,
      detailsValues,
      detailsErrors,
      detailsIsValid,
      setDetailsValue,
      setDetailsTouched,
      triggerDetailsValidation,
    }),
    [
      categoryDetails,
      detailsValues,
      detailsErrors,
      detailsIsValid,
      setDetailsValue,
      setDetailsTouched,
      triggerDetailsValidation,
    ]
  );
}
