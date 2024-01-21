import { PropsWithChildren } from "react";
import { Typography, Text as UILibText } from "react-native-ui-lib";

type TextVariant = "title" | "body";

type Props = { variant: TextVariant } & PropsWithChildren;

Typography.loadTypographies({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
});

export function Text({ variant, children }: Props) {
  const variants: Record<TextVariant, Record<string, boolean>> = {
    title: { title: true },
    body: { body: true },
  };

  return <UILibText {...variants[variant]}>{children}</UILibText>;
}
