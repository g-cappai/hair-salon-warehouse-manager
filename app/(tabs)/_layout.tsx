import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: { display: "none" },
        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tabs.Screen
        name="warehouse"
        options={{ headerShown: false, title: "Magazzino" }}
      />
      <Tabs.Screen name="scanner" options={{ title: "Scanner" }} />
      <Tabs.Screen name="index" options={{ href: null }} redirect={true} />
    </Tabs>
  );
}
