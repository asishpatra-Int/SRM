import {StyleSheet} from "react-native";

import {router, usePathname} from "expo-router";
import {TabList, Tabs, TabSlot, TabTrigger} from "expo-router/ui";

import {AppTabBar} from "@/core/base/AppTabBar";
import {useAuthStore} from "@/store";
import {getTabBarTheme} from "@/utils";

export default function TabsLayout() {
  const isGuest = useAuthStore(s => s.isGuest);
  const userType = useAuthStore(s => s.user?.userType);
  const pathname = usePathname();

  // Guests only get Explore and Practice: leaving the Kriya and Profile
  // triggers out removes those routes from the navigator, not just the bar.
  return (
    <Tabs>
      <TabSlot />
      <TabList style={styles.hidden}>
        {!isGuest && <TabTrigger name="kriya" href="/" />}
        <TabTrigger name="practice" href="/practice" />
        <TabTrigger name="explore" href="/explore" />
        {!isGuest && <TabTrigger name="profile" href="/profile" />}
      </TabList>
      <AppTabBar
        theme={getTabBarTheme(userType, pathname)}
        isGuest={isGuest}
        onSignUpPress={() => router.push("/login")}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
});
