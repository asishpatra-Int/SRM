import {type DimensionValue, StyleSheet, View} from "react-native";

import {LinearGradient} from "expo-linear-gradient";

import ProgressScrubber from "@/assets/svg/ProgressScrubber.svg";
import {colors} from "@/core/theme";

type ProgressTrackProps = {
  progressRatio: number;
};

export function ProgressTrack({progressRatio}: ProgressTrackProps) {
  const clamped = Math.min(Math.max(progressRatio, 0), 1);
  const fillWidth = `${clamped * 100}%` as DimensionValue;
  const scrubberLeft = `${clamped * 100}%` as DimensionValue;

  return (
    <View style={styles.track}>
      <View style={styles.trackBase} />
      <LinearGradient
        colors={[colors.progressFillFrom, colors.progressFillTo]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.trackFill, {width: fillWidth}]}
      />
      <View style={[styles.scrubber, {left: scrubberLeft}]}>
        <ProgressScrubber width={22} height={22} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: 13,
    justifyContent: "center",
  },
  trackBase: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 3,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.progressTrackFaint,
  },
  trackFill: {
    position: "absolute",
    left: 0,
    top: 3,
    height: 7,
    borderRadius: 3.5,
  },
  scrubber: {
    position: "absolute",
    top: "50%",
    marginTop: -11,
    transform: [{translateX: -11}],
  },
});
