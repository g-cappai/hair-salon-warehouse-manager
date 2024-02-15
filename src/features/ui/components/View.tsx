import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { View as UILibView } from "react-native-ui-lib";

type Props = { style?: StyleProp<ViewStyle> } & PropsWithChildren;

export function View({ style, children }: Props) {
  return <UILibView style={style}>{children}</UILibView>;
}
