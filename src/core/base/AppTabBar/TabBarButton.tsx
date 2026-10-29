import {forwardRef} from "react";
import type {ComponentType} from "react";

import {
  type GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {colors, radii, spacing, typography} from "@/core/theme";

import type {SvgProps} from "react-native-svg";

export type TabBarTheme = "dark" | "light";

type TabBarButtonProps = {
  theme: TabBarTheme;
  label: string;
  Icon: ComponentType<SvgProps>;
  iconWidth: number;
  iconHeight: number;
  isFocused?: boolean;
  // "tab" for route triggers; "button" for an action in the bar (Sign Up).
  accessibilityRole?: "tab" | "button";
  onPress?: (event: GestureResponderEvent) => void;
};

export const TabBarButton = forwardRef<View, TabBarButtonProps>(
  (
    {
      theme,
      label,
      Icon,
      iconWidth,
      iconHeight,
      isFocused,
      accessibilityRole = "tab",
      onPress,
    },
    ref,
  ) => {
    const isLight = theme === "light";
    const iconColor = isLight
      ? isFocused
        ? colors.borderPurple
        : colors.pillLabelDark
      : isFocused
        ? colors.accentGold
        : colors.textOnDark;
    // Light theme keeps every label dark; only the icon marks the active tab.
    const labelColor = isLight ? colors.pillLabelDark : iconColor;

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        accessibilityRole={accessibilityRole}
        accessibilityState={
          accessibilityRole === "tab" ? {selected: !!isFocused} : undefined
        }
        style={[
          styles.button,
          isLight && styles.buttonLight,
          isFocused &&
            (isLight ? styles.buttonActiveLight : styles.buttonActive),
        ]}>
        <Icon width={iconWidth} height={iconHeight} color={iconColor} />
        <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
      </Pressable>
    );
  },
);

TabBarButton.displayName = "TabBarButton";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
  },
  buttonActive: {
    backgroundColor: colors.glassFaint,
  },
  // Figma 1580:1382: 10pt item padding, pill with a soft 0/40/30 shadow.
  buttonLight: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonActiveLight: {
    backgroundColor: colors.tabActivePillLight,
    boxShadow: [
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  label: {
    ...typography.tabLabel,
  },
});
