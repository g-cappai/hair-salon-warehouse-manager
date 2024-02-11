import { yupResolver } from "@hookform/resolvers/yup";
import {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  useForm as useReactHookForm,
} from "react-hook-form";
import { ObjectSchema, AnyObject } from "yup";

type UseFormParams<T extends FieldValues> = {
  /**
   *  Accepts a yup schema
   */
  schema: ObjectSchema<T>;
  initialValues: DefaultValues<T>;
};

export function useForm<T extends AnyObject>({
  initialValues,
  schema,
}: UseFormParams<T>) {
  const {
    watch,
    handleSubmit,
    setValue: setFieldValue,
    formState,
  } = useReactHookForm({
    /** @ts-expect-error: yupResolver will create a Resover<MakeOptionalKeys<T>> type.*/
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onTouched",
  });

  function setValue(name: Path<T>, value: PathValue<T, Path<T>>) {
    setFieldValue(name, value, { shouldDirty: true, shouldValidate: true });
  }

  function setTouched(name: Path<T>) {
    return () =>
      setFieldValue(name, watch()[name], {
        shouldTouch: true,
        shouldValidate: true,
      });
  }

  return {
    handleSubmit,
    setValue,
    setTouched,
    values: watch(),
    errors: formState.errors,
  };
}