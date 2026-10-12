import type {RefObject} from "react";

import {Pressable, StyleSheet, Text, View} from "react-native";

import {BlurView} from "expo-blur";

import {colors, radii, spacing, typography} from "@/core/theme";

type GlassPillButtonProps = {
  label: string;
  onPress: () => void;
  /**
   * The background this pill blurs. Required on Android: without it,
   * `blurMethod` silently falls back to "none" and no blur is drawn.
   */
  blurTarget?: RefObject<View | null>;
};

export function GlassPillButton({
  label,
  onPress,
  blurTarget,
}: GlassPillButtonProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <BlurView
        intensity={25}
        tint="light"
        blurMethod="dimezisBlurView"
        blurTarget={blurTarget}
        style={styles.pill}>
        <Text style={styles.label}>{label}</Text>
        <View pointerEvents="none" style={styles.highlight} />
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radii.pill,
    overflow: "hidden",
    backgroundColor: colors.glassFaint,
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radii.pill,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
        color: colors.glassHighlight,
        inset: true,
      },
    ],
  },
  label: {
    ...typography.exitLabel,
    color: colors.textPrimary,
  },
});
