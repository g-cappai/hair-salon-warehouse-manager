import { ReactElement } from "react";
import { FlatList } from "react-native";

type RenderItemParams<T> = {
  item: T;
};

type Props<T> = {
  data: ArrayLike<T> | null | undefined;
  renderItem: ({ item }: RenderItemParams<T>) => ReactElement;
};

export function List<T>({ data, renderItem }: Props<T>) {
  return <FlatList data={data} renderItem={renderItem} />;
}
