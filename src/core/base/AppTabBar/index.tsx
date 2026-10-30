import {StyleSheet, View} from "react-native";

import {BlurView} from "expo-blur";
import {TabTrigger} from "expo-router/ui";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import ExploreTabIcon from "@/assets/svg/ExploreTabIcon.svg";
import KriyaTabIcon from "@/assets/svg/KriyaTabIcon.svg";
import PracticeTabIcon from "@/assets/svg/PracticeTabIcon.svg";
import ProfileTabIcon from "@/assets/svg/ProfileTabIcon.svg";
import {colors, radii, spacing} from "@/core/theme";

import {TabBarButton, type TabBarTheme} from "./TabBarButton";

const TABS = [
  {
    name: "kriya",
    isGuestAllowed: false,
    label: "Kriya",
    Icon: KriyaTabIcon,
    iconWidth: 17,
    iconHeight: 23,
  },
  {
    name: "practice",
    isGuestAllowed: true,
    label: "Practice",
    Icon: PracticeTabIcon,
    iconWidth: 22,
    iconHeight: 22,
  },
  {
    name: "explore",
    isGuestAllowed: true,
    label: "Explore",
    Icon: ExploreTabIcon,
    iconWidth: 22,
    iconHeight: 22,
  },
  {
    name: "profile",
    isGuestAllowed: false,
    label: "Profile",
    Icon: ProfileTabIcon,
    iconWidth: 22,
    iconHeight: 22,
  },
] as const;

type AppTabBarProps = {
  // See getTabBarTheme: light for guests, Free/Premium users and on
  // Explore/Profile.
  theme: TabBarTheme;
  isGuest: boolean;
  onSignUpPress: () => void;
};

export function AppTabBar({theme, isGuest, onSignUpPress}: AppTabBarProps) {
  const insets = useSafeAreaInsets();
  // Must match the triggers the tabs layout registers for the same mode.
  const visibleTabs = isGuest ? TABS.filter(tab => tab.isGuestAllowed) : TABS;
  const isLight = theme === "light";

  return (
    <View
      style={[
        styles.wrapper,
        {paddingBottom: Math.max(insets.bottom, spacing.md)},
      ]}
      pointerEvents="box-none">
      <BlurView
        intensity={60}
        tint={isLight ? "light" : "dark"}
        style={[styles.bar, isLight && styles.barLight]}>
        {visibleTabs.map(({name, label, Icon, iconWidth, iconHeight}) => (
          <TabTrigger key={name} name={name} asChild>
            <TabBarButton
              theme={theme}
              label={label}
              Icon={Icon}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
            />
          </TabTrigger>
        ))}
        {/* Guests get Sign Up in Profile's slot. It is an action, not a
            route, so it never shows as the active tab. */}
        {isGuest && (
          <TabBarButton
            theme={theme}
            label="Sign Up"
            Icon={ProfileTabIcon}
            iconWidth={22}
            iconHeight={22}
            accessibilityRole="button"
            onPress={onSignUpPress}
          />
        )}
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
  barLight: {
    backgroundColor: colors.tabBarLightBackground,
  },
});
