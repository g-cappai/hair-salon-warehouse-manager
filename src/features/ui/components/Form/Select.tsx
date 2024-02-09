import { Text } from "react-native";
import { Picker } from "react-native-ui-lib";
import { getValidationProps } from "./utils";

type Props<T> = {
  data: { value: T; label: string }[];
  placeholder?: string;
  selectedValue: T;
  onChange: (value: T | T[] | undefined) => void;
  hasError?: boolean;
  errorMessage?: string;
};

export function Select<T extends string | number>({
  data,
  placeholder,
  selectedValue,
  hasError,
  errorMessage,
  onChange,
}: Props<T>) {
  const handleChange = (
    value: (string | number) | (string | number)[] | undefined
  ) => {
    onChange(value as T | T[] | undefined);
  };

  return (
    <Picker
      floatingPlaceholder
      value={selectedValue}
      items={data}
      placeholder={placeholder}
      onChange={handleChange}
      trailingAccessory={<Text>+</Text>}
      {...getValidationProps(hasError, errorMessage)}
    >
      {data.length > 0 &&
        data.map((item) => (
          <Picker.Item key={item.value} value={item.value} label={item.label} />
        ))}
    </Picker>
  );
}