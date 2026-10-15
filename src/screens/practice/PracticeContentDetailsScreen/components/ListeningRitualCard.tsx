import {StyleSheet, View} from "react-native";

import LeafIcon from "@/assets/svg/LeafIcon.svg";
import MusicIcon from "@/assets/svg/MusicIcon.svg";
import SparklesIcon from "@/assets/svg/SparklesIcon.svg";
import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import type {ListeningRitualStepMock} from "@/screens/practice/mockData";

const RITUAL_ICONS = {
  leaf: LeafIcon,
  music: MusicIcon,
  sparkles: SparklesIcon,
} as const;

type ListeningRitualCardProps = {
  steps: ListeningRitualStepMock[];
};

export function ListeningRitualCard({steps}: ListeningRitualCardProps) {
  return (
    <View style={styles.card}>
      {steps.map(step => {
        const RitualIcon = RITUAL_ICONS[step.icon];
        return (
          <View key={step.id} style={styles.stepRow}>
            <RitualIcon width={18} height={18} />
            <AppText style={styles.stepText}>{step.text}</AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    gap: spacing.xl,
    padding: spacing.lg,
    borderRadius: 8,
    backgroundColor: colors.trackCardBackground,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    width: "100%",
  },
  stepText: {
    ...typography.detailBody,
    flex: 1,
    color: colors.contentGuidanceText,
  },
});
