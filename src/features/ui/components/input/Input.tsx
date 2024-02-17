import { getValidationProps } from "@features/ui/utils/input/getValidationProps";
import { TextField } from "react-native-ui-lib";

type InputType = "NUMERIC";

type InputProps = {
  readonly?: boolean;
  placeholder?: string;
  type?: InputType;
  value: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
};

export function Input({
  readonly,
  placeholder,
  type,
  value,
  hasError,
  errorMessage,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <TextField
      readonly={readonly}
      keyboardType={mapInputType(type)}
      floatingPlaceholder
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      {...getValidationProps(hasError, errorMessage)}
    />
  );
}

// TODO: This is the ui component then we will have the form component with all the stuff like validation controlelr ecc

function mapInputType(type?: InputType) {
  switch (type) {
    case "NUMERIC":
      return "numeric";
    default:
      return "default";
  }
}
