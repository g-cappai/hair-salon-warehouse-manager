import { Input, Select } from "@features/ui/components/input";
import { UseFormReturn } from "@features/form/hooks/useForm";
import { Brand } from "@features/core/entity/Brand.entity";
import { Category } from "@features/core/entity/Category.entity";
import { ProductBasicInfo } from "./CreateProductForm";

type Props = {
  brands: Brand[];
  categories: Category[];
} & Pick<
  UseFormReturn<ProductBasicInfo>,
  "errors" | "setTouched" | "setValue" | "values"
>;

export function ProductBasicForm({
  brands,
  categories,
  errors,
  setTouched,
  setValue,
  values: formValues,
}: Props) {
  return (
    <>
      <Input
        placeholder="Barcode"
        value={formValues.barCode}
        onChange={(value) => setValue("barCode", value)}
        onBlur={setTouched("barCode")}
        hasError={!!errors.barCode}
        errorMessage={errors.barCode?.message}
      />
      <Input
        placeholder="Quantity"
        type="NUMERIC"
        value={formValues.quantity.toString()}
        onChange={(value) => setValue("quantity", parseInt(value || "0"))}
        onBlur={setTouched("quantity")}
        hasError={!!errors.quantity}
        errorMessage={errors.quantity?.message}
      />

      <Select
        placeholder="Brand"
        data={brands?.map((b) => ({ label: b.name, value: b.id })) || []}
        selectedValue={formValues.brandId}
        onChange={(value) => setValue("brandId", value as string)}
        onBlur={setTouched("brandId")}
        hasError={!!errors.brandId}
        errorMessage={errors.brandId?.message}
      />
      <Select
        placeholder="Category"
        data={categories?.map((c) => ({ label: c.name, value: c.id })) || []}
        selectedValue={formValues.categoryId}
        onChange={(value) => setValue("categoryId", value as string)}
        onBlur={setTouched("categoryId")}
        hasError={!!errors.categoryId}
        errorMessage={errors.categoryId?.message}
      />
    </>
  );
}
