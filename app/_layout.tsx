import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{ headerShown: false }}
          initialParams={{ a: "", b: "" }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
