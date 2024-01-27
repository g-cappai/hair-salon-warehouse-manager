import { DefaultValues, useForm as useReactHookForm } from "react-hook-form";

type UseFormParams<T> = {
  initialValues: T;
};

export function useForm<T extends object>({ initialValues }: UseFormParams<T>) {
  // Probably needs to be deleted if I will use formik (or maybe not since there are formik hooks too)
  const { getValues, handleSubmit, setValue } = useReactHookForm({
    defaultValues: initialValues as DefaultValues<T>,
  });

  return {
    handleSubmit,
    setValue,
    values: getValues(),
  };
}
