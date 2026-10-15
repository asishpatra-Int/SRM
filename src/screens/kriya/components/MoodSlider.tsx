import {useCallback, useMemo} from "react";

import {type LayoutChangeEvent, StyleSheet, Text, View} from "react-native";

import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {scheduleOnRN} from "react-native-worklets";

import {colors, typography} from "@/core/theme";

const THUMB_SIZE = 28;

type MoodSliderProps = {
  /** Starting position, 0 = lowLabel, 1 = highLabel. Uncontrolled after the
   * first layout — the thumb then tracks gestures on its own and reports
   * each change through onValueChange. */
  initialValueRatio: number;
  lowLabel: string;
  highLabel: string;
  onValueChange?: (valueRatio: number) => void;
};

// Shared by every mood-style check-in in the Kriya flow (KriyaMoodScreen,
// KriyaFeelingScreen) — same track/thumb, with the end labels left up to the
// caller since each check-in asks a differently worded question.
//
// Figma bakes the track + thumb into a single flattened SVG at a fixed 354px
// width. Rendered as plain Views instead: stretching that image to fit other
// screen widths would squash the circular thumb into an ellipse.
export function MoodSlider({
  initialValueRatio,
  lowLabel,
  highLabel,
  onValueChange,
}: MoodSliderProps) {
  const clampedInitial = Math.min(Math.max(initialValueRatio, 0), 1);
  const trackWidth = useSharedValue(0);
  const thumbX = useSharedValue(0);
  // Flips true the moment the user's first gesture begins. Until then, keep
  // re-deriving the thumb position from the latest measured width: RN can
  // call onLayout more than once while the track's final width settles
  // (e.g. its first pass before the parent flex layout is fully resolved),
  // and locking in that first, possibly-too-small width would strand the
  // thumb near the left edge instead of at its intended starting ratio.
  const hasInteracted = useSharedValue(false);

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    trackWidth.value = width;
    if (!hasInteracted.value && width > THUMB_SIZE) {
      thumbX.value = clampedInitial * (width - THUMB_SIZE);
    }
  };

  const reportValueChange = useCallback(
    (valueRatio: number) => {
      onValueChange?.(valueRatio);
    },
    [onValueChange],
  );

  // A single Pan gesture (no separate Tap recognizer) covers both cases the
  // design calls for: `onBegin` fires on first touch-down — including a
  // plain tap that never moves — and positions the thumb under the finger
  // immediately; `onUpdate` then tracks continued movement. Reading the
  // touch's absolute `event.x` each time (rather than accumulating relative
  // deltas) means the thumb always maps directly to the current finger
  // position, with no drift.
  //
  // Memoized: rebuilding this on every render (the parent re-renders on each
  // onValueChange during a drag) confused GestureDetector's native handler
  // registration enough that a *second* drag after the first one completed
  // would silently fail to activate.
  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onBegin(event => {
          "worklet";
          hasInteracted.value = true;
          const maxX = trackWidth.value - THUMB_SIZE;
          if (maxX <= 0) {
            return;
          }
          const nextX = Math.min(Math.max(event.x - THUMB_SIZE / 2, 0), maxX);
          thumbX.value = nextX;
          scheduleOnRN(reportValueChange, nextX / maxX);
        })
        .onUpdate(event => {
          "worklet";
          const maxX = trackWidth.value - THUMB_SIZE;
          if (maxX <= 0) {
            return;
          }
          const nextX = Math.min(Math.max(event.x - THUMB_SIZE / 2, 0), maxX);
          thumbX.value = nextX;
          scheduleOnRN(reportValueChange, nextX / maxX);
        }),
    [trackWidth, thumbX, hasInteracted, reportValueChange],
  );

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: thumbX.value}],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.track} onLayout={handleTrackLayout}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </View>
      </GestureDetector>
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
    left: 0,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.textOnDark,
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
