import * as yup from "yup";

export default function productBasicInfoSchema() {
  return yup
    .object()
    .shape({
      barCode: yup.string().typeError("TYPE").required("REQUIRED"),
      quantity: yup.number().typeError("TYPE").required("REQUIRED"),
      brandId: yup.string().typeError("TYPE").required("REQUIRED"),
      categoryId: yup.string().typeError("TYPE").required("REQUIRED"),
    })
    .required();
}
