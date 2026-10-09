import { BlurView } from "expo-blur";
import { TabTrigger } from "expo-router/ui";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ExploreTabIcon from "@/assets/svg/ExploreTabIcon.svg";
import KriyaTabIcon from "@/assets/svg/KriyaTabIcon.svg";
import PracticeTabIcon from "@/assets/svg/PracticeTabIcon.svg";
import ProfileTabIcon from "@/assets/svg/ProfileTabIcon.svg";
import { colors, radii, spacing } from "@/core/theme";

import { TabBarButton } from "./TabBarButton";

const TABS = [
  { name: "kriya", label: "Kriya", Icon: KriyaTabIcon },
  { name: "practice", label: "Practice", Icon: PracticeTabIcon },
  { name: "explore", label: "Explore", Icon: ExploreTabIcon },
  { name: "profile", label: "Profile", Icon: ProfileTabIcon },
] as const;

export function AppTabBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.md) }]} pointerEvents="box-none">
      <BlurView intensity={60} tint="dark" style={styles.bar}>
        {TABS.map(({ name, label, Icon }) => (
          <TabTrigger key={name} name={name} asChild>
            <TabBarButton label={label} Icon={Icon} />
          </TabTrigger>
        ))}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.sm,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.tabBarTint,
  },
});
