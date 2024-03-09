import { ProductDetail } from "@features/core/entity/Product.entity";
import { useEffect, useMemo } from "react";
import { useProductBasicInfo } from "./useProductBasicInfo";
import { useProductDetails } from "./useProductDetails";

type UseProductFormParams = {
  barCode: string;
};

export type ProductBasicInfo = {
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
};

export type ProductDetails = {
  details: ProductDetail[];
};

type FormValues = ProductBasicInfo & ProductDetails;

type SubmitCallback = (formValues: FormValues) => void;

export type useProductFormReturn = ReturnType<typeof useProductForm>;

export function useProductForm({ barCode }: UseProductFormParams) {
  const {
    brands,
    categories,
    basicValues,
    basicErrors,
    basicIsValid,
    setBasicValue,
    resetBasicForm,
    setBasicTouched,
    triggerBasicValidation,
  } = useProductBasicInfo(barCode);

  const {
    categoryDetails,
    detailsErrors,
    detailsIsValid,
    detailsValues,
    setDetailsTouched,
    setDetailsValue,
    triggerDetailsValidation,
  } = useProductDetails(basicValues.categoryId);

  const values = {
    ...basicValues,
    details: Object.entries(detailsValues).map(([categoryDetailId, value]) => ({
      categoryDetailId,
      value,
    })),
  } as FormValues;

  const handleSubmit = (cb: SubmitCallback) => {
    triggerBasicValidation();
    triggerDetailsValidation();
    if (!basicIsValid || !detailsIsValid) return;
    cb(values);
  };

  useEffect(() => {
    if (barCode) {
      setBasicValue("barCode", barCode);
    }
  }, [barCode]);

  return useMemo(
    () => ({
      values,
      handleSubmit,
      reset: resetBasicForm,
      /**
       * For internal use only. Its content may change in future.
       */
      form: {
        values: { ...basicValues, ...detailsValues } as FormValues &
          Record<string, string>,
        basicErrors,
        detailsErrors,
        brands,
        categories,
        categoryDetails,
        setBasicValue,
        setDetailsValue,
        setBasicTouched,
        setDetailsTouched,
      },
    }),
    [
      basicValues,
      detailsValues,
      basicErrors,
      detailsErrors,
      brands,
      categories,
      categoryDetails,
    ]
  );
}

// Cerca il prodotto
// Se esiste, popola il form con i dati del prodotto
// Se non esiste, popola il form con i dati di default
