import {Pressable, StyleSheet, Text, View} from "react-native";

import CheckmarkIcon from "@/assets/svg/CheckmarkIcon.svg";
import {colors, spacing, typography} from "@/core/theme";

type ShareCheckboxProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export function ShareCheckbox({label, checked, onToggle}: ShareCheckboxProps) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{checked}}
      style={styles.row}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <CheckmarkIcon width={10.5} height={8.45} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    borderWidth: 0,
    backgroundColor: colors.accentGold,
  },
  label: {
    ...typography.durationLabel,
    color: colors.textPrimary,
  },
});
