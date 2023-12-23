import { TextField } from "react-native-ui-lib";

type InputType = "NUMERIC";

type Props = {
  value: string;
  placeholder?: string;
  type?: InputType;
  onChange: (text: string) => void;
};

export function Input({ value, placeholder, type, onChange }: Props) {
  return (
    <TextField
      keyboardType={type === "NUMERIC" ? "numeric" : "default"}
      floatingPlaceholder
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
    />
  );
}
