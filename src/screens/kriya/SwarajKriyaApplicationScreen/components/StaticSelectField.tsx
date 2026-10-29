import {StyleSheet, Text, View} from "react-native";

import SelectChevronIcon from "@/assets/svg/kriya/SelectChevronIcon.svg";
import {AppGlassInputSurface} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

type StaticSelectFieldProps = {
  value: string;
  accessibilityLabel: string;
};

// Figma 1580:1902 (country). Only one option exists until the backend
// supplies a list, so it shows the value with the dropdown chevron but
// opens nothing.
export function StaticSelectField({
  value,
  accessibilityLabel,
}: StaticSelectFieldProps) {
  return (
    <AppGlassInputSurface style={styles.surface}>
      <Text
        style={styles.value}
        accessibilityLabel={`${accessibilityLabel}: ${value}`}>
        {value}
      </Text>
      {/* Figma draws a left chevron rotated -90° into a 10×5 slot. */}
      <View style={styles.chevron}>
        <SelectChevronIcon width={6.93137} height={11.6} />
      </View>
    </AppGlassInputSurface>
  );
}

const styles = StyleSheet.create({
  surface: {
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  value: {
    ...typography.inputText,
    color: colors.authTextMuted,
  },
  chevron: {
    width: 10,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
    transform: [{rotate: "-90deg"}],
  },
});
