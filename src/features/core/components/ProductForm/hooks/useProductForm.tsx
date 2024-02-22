import { useBrands } from "@features/core/data-access/hooks/brand";
import {
  useCategories,
  useCategoryDetails,
} from "@features/core/data-access/hooks/category";
import { useForm } from "@features/form/hooks";
import productBasicInfoSchema from "../schema/productBasicInfo.schema";
import categoryDetailsInfoSchema from "../schema/categoryDetailsInfo.schema";
import { ProductDetail } from "@features/core/entity/Product.entity";
import { useEffect } from "react";

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
    reset,
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

  return {
    values,
    handleSubmit,
    reset,
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
  };
}
