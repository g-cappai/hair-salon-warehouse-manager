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
import { usePopulatedProductByBarCode } from "@features/core/data-access/hooks/product";

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
  const { data: product, isFetching: isFetchingProduct } =
    usePopulatedProductByBarCode(barCode);

  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  console.log("product", product);

  const basicInitialValues: ProductBasicInfo = {
    barCode,
    quantity: product?.quantity ?? 1,
    brandId: product?.brand.id || "",
    categoryId: product?.category.id || "",
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

  const { data: categoryDetails, isFetching: isFetchingDetails } =
    useCategoryDetails(basicValues.categoryId);

  const detailsInitialValues =
    categoryDetails?.reduce<Record<string, string>>((acc, categoryDetail) => {
      const productDetailValue = product?.details.find(
        (d) => d.categoryDetail.id === categoryDetail.id
      )?.value;

      acc[categoryDetail.id] =
        productDetailValue || categoryDetail.defaultValue || "";

      return acc;
    }, {}) || {};

  const {
    triggerValidation: triggerDetailsValidation,
    values: detailsValues,
    setValue: setDetailsValue,
    setTouched: setDetailsTouched,
    errors: detailsErrors,
    isValid: detailsIsValid,
    reset: resetDetailsForm,
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
  console.log("gotData", !!product, !!categoryDetails);
  console.log("isLoading", isFetchingProduct, isFetchingDetails);

  useEffect(() => {
    if (categoryDetails && !isFetchingDetails) {
      resetDetailsForm(detailsInitialValues);
    }

    if (product && !isFetchingProduct) {
      resetBasicForm(basicInitialValues);
    }
  }, [product, categoryDetails, isFetchingProduct, isFetchingDetails]);

  return {
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
      isLoading: isFetchingProduct || isFetchingDetails,
    },
  };
}

// Cerca il prodotto
// Se esiste, popola il form con i dati del prodotto
// Se non esiste, popola il form con i dati di default
