import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";
import { View as UILibView } from "react-native-ui-lib";

type Props = ViewProps & PropsWithChildren;

export function View({ children, ...props }: Props) {
  return <UILibView {...props}>{children}</UILibView>;
}
