import { Link as ExpoRouterLink, Href } from "expo-router";
import { PropsWithChildren } from "react";

type Props<T> = { href: Href<T> } & PropsWithChildren;

export function Link<T>({ href, children }: Props<T>) {
  return <ExpoRouterLink href={href}>{children}</ExpoRouterLink>;
}
