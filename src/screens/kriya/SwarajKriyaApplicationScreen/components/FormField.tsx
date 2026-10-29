import type {ReactNode} from "react";

import {StyleSheet, Text, View} from "react-native";

import {colors, spacing, typography} from "@/core/theme";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

// Figma "OTP Input Group": label → 12 → control(s), plus a validation line.
export function FormField({label, error, children}: FormFieldProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: spacing.md,
  },
  label: {
    ...typography.bodyHeading,
    color: colors.pillLabelDark,
  },
  error: {
    ...typography.detailBody,
    color: colors.authErrorText,
  },
});
