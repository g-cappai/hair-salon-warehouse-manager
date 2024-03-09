import { render } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>{children}</Suspense>
    </QueryClientProvider>
  );
};

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react-native";

export { customRender as render };
