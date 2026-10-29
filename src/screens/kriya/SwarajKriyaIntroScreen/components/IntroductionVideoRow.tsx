import {Pressable, StyleSheet, Text, View} from "react-native";

import PlayCircleIcon from "@/assets/svg/PlayCircleIcon.svg";
import {colors, radii, spacing, typography} from "@/core/theme";

type IntroductionVideoRowProps = {
  title: string;
  durationLabel: string;
  onPress?: () => void;
};

// Figma 1580:1293: 8% purple glass row — title, duration, play button.
export function IntroductionVideoRow({
  title,
  durationLabel,
  onPress,
}: IntroductionVideoRowProps) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${durationLabel}`}>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{durationLabel}</Text>
      </View>
      <PlayCircleIcon width={30} height={30} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.input,
    backgroundColor: colors.kriyaIntroRowBackground,
    boxShadow: [
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  details: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.bodyHeading,
    color: colors.pillLabelDark,
  },
  duration: {
    ...typography.caption,
    color: colors.exploreTextMuted,
  },
});
