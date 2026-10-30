import {StyleSheet, View} from "react-native";

import LeafIcon from "@/assets/svg/LeafIcon.svg";
import MusicIcon from "@/assets/svg/MusicIcon.svg";
import SparklesIcon from "@/assets/svg/SparklesIcon.svg";
import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import type {ListeningRitualStepMock} from "@/screens/practice/mockData";

import type {PracticeTheme} from "../../PracticeScreen/components";

const RITUAL_ICONS = {
  leaf: LeafIcon,
  music: MusicIcon,
  sparkles: SparklesIcon,
} as const;

type ListeningRitualCardProps = {
  theme: PracticeTheme;
  steps: ListeningRitualStepMock[];
};

export function ListeningRitualCard({theme, steps}: ListeningRitualCardProps) {
  const isLight = theme === "light";

  return (
    <View style={[styles.card, isLight && styles.cardLight]}>
      {steps.map(step => {
        const RitualIcon = RITUAL_ICONS[step.icon];
        return (
          <View key={step.id} style={styles.stepRow}>
            <RitualIcon width={18} height={18} />
            <AppText style={[styles.stepText, isLight && styles.stepTextLight]}>
              {step.text}
            </AppText>
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
  // Same glass card as the light TrackListItem.
  cardLight: {
    backgroundColor: colors.exploreGlassCardBackground,
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
  stepTextLight: {
    color: colors.pillLabelDark,
  },
});
