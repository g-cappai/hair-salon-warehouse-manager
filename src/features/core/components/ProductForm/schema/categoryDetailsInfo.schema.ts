import { CategoryDetail } from "@features/core/entity/Category.entity";
import * as yup from "yup";

export default function categoryDetailsInfoSchema(
  categoryDetails?: CategoryDetail[]
) {
  return yup
    .object()
    .shape(
      categoryDetails?.reduce<Record<string, yup.Schema>>((acc, detail) => {
        let detailValidationRule = yup.string().typeError("TYPE");

        if (detail.required) {
          detailValidationRule = detailValidationRule.required("REQUIRED");
        }

        acc[detail.id] = detailValidationRule;

        return acc;
      }, {}) || {}
    )
    .required();
}
