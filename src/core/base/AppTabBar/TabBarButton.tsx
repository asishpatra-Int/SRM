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

type TabBarButtonProps = {
  label: string;
  Icon: ComponentType<SvgProps>;
  iconWidth: number;
  iconHeight: number;
  isFocused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export const TabBarButton = forwardRef<View, TabBarButtonProps>(
  ({label, Icon, iconWidth, iconHeight, isFocused, onPress}, ref) => {
    const tintColor = isFocused ? colors.accentGold : colors.textOnDark;

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        accessibilityRole="tab"
        accessibilityState={{selected: !!isFocused}}
        style={[styles.button, isFocused && styles.buttonActive]}>
        <Icon width={iconWidth} height={iconHeight} color={tintColor} />
        <Text style={[styles.label, {color: tintColor}]}>{label}</Text>
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
  label: {
    ...typography.tabLabel,
  },
});
