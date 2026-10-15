import {Pressable, StyleSheet, Text} from "react-native";

import {colors, radii, spacing, typography} from "@/core/theme";

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

// Sits on top of the filter sheet's own blurred surface, so a flat tint
// (rather than a second BlurView) carries the glass look here — see
// BottomSheet's Android note on why a blur inside a Modal has nothing behind
// it to sample.
export function FilterChip({label, selected, onPress}: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{selected}}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
      ]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
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
  },
  chipUnselected: {
    backgroundColor: colors.chipBackground,
  },
  chipSelected: {
    backgroundColor: colors.chipBackgroundSelected,
  },
  label: {
    ...typography.filterChipLabel,
    color: colors.textOnDark,
  },
  labelSelected: {
    color: colors.ctaTextDark,
  },
});
