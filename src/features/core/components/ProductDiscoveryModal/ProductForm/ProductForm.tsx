import { Input, Select } from "@features/ui/components/input";
import { useProductFormReturn } from "./hooks/useProductForm";

type Props = {
  form: useProductFormReturn["form"];
};

export function ProductForm({ form }: Props) {
  return (
    <>
      <Input
        placeholder="Barcode"
        value={form.values.barCode}
        onChange={(value) => form.setBasicValue("barCode", value)}
        onBlur={form.setBasicTouched("barCode")}
        hasError={!!form.basicErrors.barCode}
        errorMessage={form.basicErrors.barCode?.message}
      />
      <Input
        placeholder="Quantity"
        type="NUMERIC"
        value={form.values.quantity.toString()}
        onChange={(value) =>
          form.setBasicValue("quantity", parseInt(value || "0"))
        }
        onBlur={form.setBasicTouched("quantity")}
        hasError={!!form.basicErrors.quantity}
        errorMessage={form.basicErrors.quantity?.message}
      />

      <Select
        placeholder="Brand"
        data={form.brands?.map((b) => ({ label: b.name, value: b.id })) || []}
        selectedValue={form.values.brandId}
        onChange={(value) => form.setBasicValue("brandId", value as string)}
        onBlur={form.setBasicTouched("brandId")}
        hasError={!!form.basicErrors.brandId}
        errorMessage={form.basicErrors.brandId?.message}
      />
      <Select
        placeholder="Category"
        data={
          form.categories?.map((c) => ({ label: c.name, value: c.id })) || []
        }
        selectedValue={form.values.categoryId}
        onChange={(value) => form.setBasicValue("categoryId", value as string)}
        onBlur={form.setBasicTouched("categoryId")}
        hasError={!!form.basicErrors.categoryId}
        errorMessage={form.basicErrors.categoryId?.message}
      />

      {form.categoryDetails?.map((categoryDetail) => {
        if (categoryDetail.type === "string") {
          return (
            <Input
              key={categoryDetail.id}
              placeholder={categoryDetail.label}
              value={form.values[categoryDetail.id]}
              onChange={(value) =>
                form.setDetailsValue(categoryDetail.id, value)
              }
              onBlur={form.setDetailsTouched(categoryDetail.id)}
              hasError={!!form.detailsErrors[categoryDetail.id]}
              errorMessage={form.detailsErrors[categoryDetail.id]?.message}
            />
          );
        }
      })}
    </>
  );
}