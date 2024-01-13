import { Text } from "react-native";
import { Picker } from "react-native-ui-lib";

type Props<T> = {
  selectedValue: T;
  data: { value: T; label: string }[];
  placeholder?: string;
  onChange: (value: T | T[] | undefined) => void;
};

export function Select<T extends string | number>({
  data,
  selectedValue,
  placeholder,
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
    >
      {data.length > 0 &&
        data.map((item) => (
          <Picker.Item key={item.value} value={item.value} label={item.label} />
        ))}
    </Picker>
  );
}
