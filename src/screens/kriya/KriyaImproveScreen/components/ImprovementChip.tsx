import type {RefObject} from "react";

import {Pressable, StyleSheet, Text, View} from "react-native";

import {BlurView} from "expo-blur";

import {colors, radii, spacing, typography} from "@/core/theme";

type ImprovementChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  /**
   * The background this chip blurs when unselected. Required on Android:
   * without it, `blurMethod` silently falls back to "none" and no blur is
   * drawn.
   */
  blurTarget?: RefObject<View | null>;
};

// Figma shows only the unselected state (translucent glass pill). The
// selected state uses `palette/tone-04`, a design-system colour bound to
// this exact chip component, filled solid — consistent with how the rest of
// the app marks an active/selected state with a gold fill.
export function ImprovementChip({
  label,
  selected,
  onPress,
  blurTarget,
}: ImprovementChipProps) {
  if (selected) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{selected: true}}
        style={[styles.chip, styles.chipSelected]}>
        <Text style={[styles.label, styles.labelSelected]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{selected: false}}>
      <BlurView
        intensity={50}
        tint="light"
        blurMethod="dimezisBlurView"
        blurTarget={blurTarget}
        style={[styles.chip, styles.chipUnselected]}>
        <Text style={styles.label}>{label}</Text>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 38,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radii.chip,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  chipUnselected: {
    backgroundColor: colors.chipBackground,
  },
  chipSelected: {
    backgroundColor: colors.chipBackgroundSelected,
  },
  label: {
    ...typography.chipLabel,
    color: colors.textOnDark,
  },
  labelSelected: {
    color: colors.ctaTextDark,
  },
});
