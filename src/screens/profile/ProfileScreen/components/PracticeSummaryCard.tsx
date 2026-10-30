import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";

import cardBackground from "@/assets/kriya-card-bg.png";
import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

type PracticeSummaryCardProps = {
  title: string;
  sessionsLabel: string;
  hoursLabel: string;
};

// Figma 1671:1618: the Kriya card texture under the streak gradient. The
// 163.79° CSS line is converted for the ~354×90 card and stretched so its
// 104.8% stop lands on 1.
export function PracticeSummaryCard({
  title,
  sessionsLabel,
  hoursLabel,
}: PracticeSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={cardBackground}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={colors.profileStreakCardGradient}
        locations={colors.profileStreakCardGradientLocations}
        start={{x: 0.427, y: -0.488}}
        end={{x: 0.58, y: 1.583}}
        style={StyleSheet.absoluteFill}
      />
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.meta}>
        {`${sessionsLabel}  ·  ${hoursLabel}`}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.xl,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: [
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  title: {
    ...typography.bodyHeading,
    color: colors.textOnDark,
  },
  meta: {
    ...typography.detailLabel,
    color: colors.textOnDark,
  },
});
