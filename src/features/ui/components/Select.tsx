import { Text } from "react-native";
import { Picker } from "react-native-ui-lib";

type Props = {
  selectedValue: string | number;
  data: { value: string | number; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
};

export function Select({ data, selectedValue, placeholder, onChange }: Props) {
  return (
    <Picker
      floatingPlaceholder
      value={selectedValue}
      placeholder={placeholder}
      onChange={onChange}
      trailingAccessory={<Text>+</Text>}
    >
      {data.map((item) => (
        <Picker.Item key={item.value} value={item.value} label={item.label} />
      ))}
    </Picker>
  );
}
