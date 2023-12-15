import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="warehouse" options={{ title: "Magazzino" }} />
        <Tabs.Screen name="scanner" options={{ title: "Scanner" }} />
      </Tabs>
    </QueryClientProvider>
  );
}
