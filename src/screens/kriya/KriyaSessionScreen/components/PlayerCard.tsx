import {StyleSheet, Text, View} from "react-native";

import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";

import cardBackground from "@/assets/kriya-session-card-bg.png";
import PlayerRingGlow from "@/assets/svg/PlayerRingGlow.svg";
import VolumeIcon from "@/assets/svg/VolumeIcon.svg";
import {colors, radii, spacing, typography} from "@/core/theme";

import {EqualizerBars} from "./EqualizerBars";
import {ProgressTrack} from "./ProgressTrack";

type PlayerCardProps = {
  title: string;
  elapsedTimeLabel: string;
  progressRatio: number;
};

export function PlayerCard({
  title,
  elapsedTimeLabel,
  progressRatio,
}: PlayerCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={cardBackground}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={colors.sessionCardGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.ringWrapper}>
        <PlayerRingGlow
          width={67}
          height={67}
          style={StyleSheet.absoluteFill}
        />
        <EqualizerBars />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.progressGroup}>
          <ProgressTrack progressRatio={progressRatio} />
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>{elapsedTimeLabel}</Text>
            <VolumeIcon width={30} height={30} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    gap: spacing.md - 2,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.borderPurple,
    overflow: "hidden",
  },
  ringWrapper: {
    width: 67,
    height: 67,
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    width: "100%",
    gap: spacing.md - 3,
  },
  title: {
    ...typography.cardTitle,
    color: colors.textOnDark,
    textAlign: "center",
  },
  progressGroup: {
    width: "100%",
    gap: spacing.xs,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLabel: {
    ...typography.timeLabel,
    color: colors.timeLabelDark,
  },
});
