import {
  DefaultValues,
  Resolver,
  useForm as useReactHookForm,
} from "react-hook-form";

type UseFormParams<T extends object> = {
  initialValues: T;
  resolver: Resolver<T>;
};

export function useForm<T extends object>({
  initialValues,
  resolver,
}: UseFormParams<T>) {
  const { watch, handleSubmit, setValue } = useReactHookForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
    resolver,
  });

  return {
    handleSubmit,
    setValue,
    values: watch(),
  };
}
