import { BlurView } from "expo-blur";
import { StyleSheet, Text } from "react-native";

import { colors, radii, spacing, typography } from "@/core/theme";

type CompletionBadgeProps = {
  timesCompletedToday: number;
};

export function CompletionBadge({ timesCompletedToday }: CompletionBadgeProps) {
  const timesLabel = timesCompletedToday === 1 ? "Time" : "Times";

  return (
    <BlurView intensity={50} tint="dark" style={styles.badge}>
      <Text style={styles.text}>
        You Have Completed Kriya{" "}
        <Text style={styles.textBold}>
          {timesCompletedToday} {timesLabel} Today
        </Text>
      </Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    overflow: "hidden",
    backgroundColor: colors.badgeBackground,
  },
  text: {
    ...typography.badgeText,
    fontWeight: "300",
    color: colors.textOnDark,
    textAlign: "center",
  },
  textBold: {
    fontWeight: "700",
    color: colors.textOnDark,
  },
});
