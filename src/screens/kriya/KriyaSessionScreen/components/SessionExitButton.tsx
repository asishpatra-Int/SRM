import type {RefObject} from "react";

import {Pressable, StyleSheet, Text, View} from "react-native";

import {BlurView} from "expo-blur";

import {colors, radii, spacing, typography} from "@/core/theme";

type SessionExitButtonProps = {
  onPress: () => void;
  /**
   * The background this pill blurs. Required on Android: without it,
   * `blurMethod` silently falls back to "none" and no blur is drawn.
   */
  blurTarget?: RefObject<View | null>;
};

export function SessionExitButton({
  onPress,
  blurTarget,
}: SessionExitButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={styles.wrapper}>
      <BlurView
        intensity={25}
        tint="light"
        blurMethod="dimezisBlurView"
        blurTarget={blurTarget}
        style={styles.pill}>
        <Text style={styles.label}>Exit</Text>
        <View pointerEvents="none" style={styles.highlight} />
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },
  // Figma: px 16 / py 10, radius 50, fill rgba(255,255,255,0.04) over a
  // backdrop blur — a lightening frosted pill, not a darkening one.
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radii.pill,
    overflow: "hidden",
    backgroundColor: colors.glassFaint,
  },
  // Figma draws the "window glass" inset highlight as its own overlay layer;
  // it is what gives the pill its defined upper edge.
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
