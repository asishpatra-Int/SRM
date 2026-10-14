import {type DimensionValue, StyleSheet, Text, View} from "react-native";

import {colors, typography} from "@/core/theme";

const THUMB_SIZE = 28;

type MoodSliderProps = {
  /** 0 = lowLabel, 1 = highLabel. */
  valueRatio: number;
  lowLabel: string;
  highLabel: string;
};

// Shared by every mood-style check-in in the Kriya flow (KriyaMoodScreen,
// KriyaFeelingScreen) — same track/thumb, with the end labels left up to the
// caller since each check-in asks a differently worded question.
//
// Figma bakes the track + thumb into a single flattened SVG at a fixed 354px
// width. Rendered as plain Views instead: stretching that image to fit other
// screen widths would squash the circular thumb into an ellipse.
export function MoodSlider({valueRatio, lowLabel, highLabel}: MoodSliderProps) {
  const clamped = Math.min(Math.max(valueRatio, 0), 1);
  const thumbLeft = `${clamped * 100}%` as DimensionValue;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.thumb, {left: thumbLeft}]} />
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{lowLabel}</Text>
        <Text style={styles.label}>{highLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 11,
  },
  track: {
    width: "100%",
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.moodSliderTrack,
    justifyContent: "center",
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.textOnDark,
    transform: [{translateX: -THUMB_SIZE / 2}],
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    ...typography.sliderEndLabel,
    color: colors.textPrimary,
  },
});
