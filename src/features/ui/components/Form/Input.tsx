import { TextField } from "react-native-ui-lib";
import { getValidationProps } from "./utils";

type InputType = "NUMERIC";

type Props = {
  placeholder?: string;
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
};

export function Input({
  placeholder,
  type,
  value,
  hasError,
  errorMessage,
  onChange,
}: Props) {
  return (
    <TextField
      keyboardType={mapInputType(type)}
      floatingPlaceholder
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      {...getValidationProps(hasError, errorMessage)}
    />
  );
}

function mapInputType(type?: InputType) {
  switch (type) {
    case "NUMERIC":
      return "numeric";
    default:
      return "default";
  }
}
