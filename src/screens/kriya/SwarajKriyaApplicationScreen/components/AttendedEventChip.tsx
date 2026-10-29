import {Pressable, StyleSheet, Text} from "react-native";

import {colors, radii, spacing, typography} from "@/core/theme";

type AttendedEventChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

// Figma 1580:2308: purple when selected, 34% white glass otherwise.
export function AttendedEventChip({
  label,
  isSelected,
  onPress,
}: AttendedEventChipProps) {
  return (
    <Pressable
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{checked: isSelected}}
      accessibilityLabel={label}>
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 38,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    borderRadius: radii.chip,
    backgroundColor: colors.applicationChipBackground,
    boxShadow: [
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  chipSelected: {
    backgroundColor: colors.borderPurple,
  },
  label: {
    ...typography.filterChipLabel,
    color: colors.applicationChipLabel,
    textTransform: "capitalize",
  },
  labelSelected: {
    color: colors.textOnDark,
  },
});
