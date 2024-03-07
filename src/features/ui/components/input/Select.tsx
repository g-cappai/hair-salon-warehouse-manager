import { getValidationProps } from "@features/ui/utils/input/getValidationProps";
import { Text } from "react-native";
import { Picker } from "react-native-ui-lib";

type SelectProps<T> = {
  data: { value: T; label: string }[];
  placeholder?: string;
  selectedValue: T;
  onChange: (value: T | T[] | undefined) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  testID?: string;
};

export function Select<T extends string | number>({
  data,
  placeholder,
  selectedValue,
  hasError,
  errorMessage,
  testID,
  onChange,
  onBlur,
}: SelectProps<T>) {
  const handleChange = (
    value: (string | number) | (string | number)[] | undefined
  ) => {
    onChange(value as T | T[] | undefined);
  };

  return (
    <Picker
      testID={testID}
      floatingPlaceholder
      value={selectedValue}
      items={data}
      placeholder={placeholder}
      onChange={handleChange}
      trailingAccessory={<Text>+</Text>}
      pickerModalProps={{ onDismiss: onBlur }}
      {...getValidationProps(hasError, errorMessage)}
    >
      {data.length > 0 &&
        data.map((item) => (
          <Picker.Item
            key={item.value}
            value={item.value}
            label={item.label}
            testID={`select-item-${item.value}`}
          />
        ))}
    </Picker>
  );
}
