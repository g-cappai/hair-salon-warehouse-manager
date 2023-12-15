import { ReactElement } from "react";
import { FlatList } from "react-native";

type RenderItemParams<T> = {
  item: T;
};

type Props<T> = {
  data: ArrayLike<T> | null | undefined;
  renderItem: ({ item }: RenderItemParams<T>) => ReactElement;
  keyExtractor?: (item: T) => string;
};

export function List<T>({ data, renderItem, keyExtractor }: Props<T>) {
  return (
    <FlatList keyExtractor={keyExtractor} data={data} renderItem={renderItem} />
  );
}
