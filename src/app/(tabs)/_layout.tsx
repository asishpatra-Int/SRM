import {StyleSheet} from "react-native";

import {TabList, Tabs, TabSlot, TabTrigger} from "expo-router/ui";

import {AppTabBar} from "@/core/base/AppTabBar";

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={styles.hidden}>
        <TabTrigger name="kriya" href="/" />
        <TabTrigger name="practice" href="/practice" />
        <TabTrigger name="explore" href="/explore" />
        <TabTrigger name="profile" href="/profile" />
      </TabList>
      <AppTabBar />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
});
