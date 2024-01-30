import { DefaultValues, useForm as useReactHookForm } from "react-hook-form";

type UseFormParams<T> = {
  initialValues: T;
};

export function useForm<T extends object>({ initialValues }: UseFormParams<T>) {
  const { watch, handleSubmit, setValue } = useReactHookForm({
    defaultValues: initialValues as DefaultValues<T>,
  });

  return {
    handleSubmit,
    setValue,
    values: watch(),
  };
}
