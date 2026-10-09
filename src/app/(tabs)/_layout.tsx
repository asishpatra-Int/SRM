import { Tabs, TabList, TabSlot, TabTrigger } from "expo-router/ui";

import { AppTabBar } from "@/core/base/AppTabBar";

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={{ display: "none" }}>
        <TabTrigger name="kriya" href="/" />
        <TabTrigger name="practice" href="/practice" />
        <TabTrigger name="explore" href="/explore" />
        <TabTrigger name="profile" href="/profile" />
      </TabList>
      <AppTabBar />
    </Tabs>
  );
}
