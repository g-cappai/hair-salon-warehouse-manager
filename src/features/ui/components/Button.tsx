import { ButtonProps, Button as UILibButton } from "react-native-ui-lib";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type Props = { title: string; onPress: () => void; variant?: ButtonVariant };

export function Button({ title, variant = "primary", onPress }: Props) {
  const variants: Record<ButtonVariant, ButtonProps> = {
    primary: {},
    secondary: { outline: true },
    tertiary: { link: true },
  };

  return <UILibButton {...variants[variant]} label={title} onPress={onPress} />;
}
