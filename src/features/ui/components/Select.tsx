import { Text } from "react-native";
import { Picker } from "react-native-ui-lib";

type Props = {
  selectedValue: string | number;
  data: { value: string | number; label: string }[];
  placeholder?: string;
  onChange: (
    value: (string | number) | (string | number)[] | undefined
  ) => void;
};

export function Select({ data, selectedValue, placeholder, onChange }: Props) {
  return (
    <Picker
      floatingPlaceholder
      value={selectedValue}
      items={data}
      placeholder={placeholder}
      onChange={onChange}
      trailingAccessory={<Text>+</Text>}
    >
      {data.length > 0 &&
        data.map((item) => (
          <Picker.Item key={item.value} value={item.value} label={item.label} />
        ))}
    </Picker>
  );
}
