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
  isFocused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export const TabBarButton = forwardRef<View, TabBarButtonProps>(
  ({label, Icon, isFocused, onPress}, ref) => {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        accessibilityRole="tab"
        accessibilityState={{selected: !!isFocused}}
        style={[styles.button, isFocused && styles.buttonActive]}>
        <Icon width={isFocused ? 17 : 22} height={isFocused ? 23 : 22} />
        <Text style={[styles.label, isFocused && styles.labelActive]}>
          {label}
        </Text>
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
    color: colors.textOnDark,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
