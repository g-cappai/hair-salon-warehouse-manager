import { useBrands } from "@features/core/data-access/hooks/brand";
import {
  useCategories,
  useCategoryDetails,
} from "@features/core/data-access/hooks/category";
import { useCreateProduct } from "@features/core/data-access/hooks/product";
import { useForm } from "@features/form/hooks";
import productBasicInfoSchema from "../schema/productBasicInfo.schema";
import categoryDetailsInfoSchema from "../schema/categoryDetailsInfo.schema";

type UseProductFormParams = {
  barCode: string;
};

export type ProductBasicInfo = {
  barCode: string;
  quantity: number;
  brandId: string;
  categoryId: string;
};

type FormValues = ProductBasicInfo & Record<string, string>;

export type useProductFormReturn = ReturnType<typeof useProductForm>;

export function useProductForm({ barCode }: UseProductFormParams) {
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
  };

  const values = { ...basicValues, ...detailsValues } as FormValues;

  return {
    values,
    handleSubmit,
    /**
     * For internal use only. Its content may change in future.
     */
    form: {
      values,
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
