import {Pressable, StyleSheet, Text} from "react-native";

import {BlurView} from "expo-blur";

import {colors, radii, spacing, typography} from "@/core/theme";

type SessionExitButtonProps = {
  onPress: () => void;
};

export function SessionExitButton({onPress}: SessionExitButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.pill}>
        <Text style={styles.label}>Exit</Text>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    overflow: "hidden",
    backgroundColor: colors.glassFaint,
  },
  label: {
    ...typography.exitLabel,
    color: colors.textPrimary,
  },
});
