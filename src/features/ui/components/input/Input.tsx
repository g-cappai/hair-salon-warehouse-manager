import { getValidationProps } from "@features/ui/utils/input/getValidationProps";
import { TextField } from "react-native-ui-lib";

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

// TODO: This is the ui component then we will have the form component with all the stuff like validation controlelr ecc

function mapInputType(type?: InputType) {
  switch (type) {
    case "NUMERIC":
      return "numeric";
    default:
      return "default";
  }
}
