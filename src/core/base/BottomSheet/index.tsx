import {type ReactNode, useEffect, useState} from "react";

import {Modal, Pressable, StyleSheet, type ViewStyle} from "react-native";

import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {colors} from "@/core/theme";

const ANIMATION_DURATION = 280;
const OFF_SCREEN_OFFSET = 420;

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  contentStyle?: ViewStyle;
};

export function BottomSheet({
  visible,
  onClose,
  children,
  contentStyle,
}: BottomSheetProps) {
  const [isMounted, setIsMounted] = useState(visible);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      progress.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = withTiming(
        0,
        {duration: ANIMATION_DURATION, easing: Easing.in(Easing.cubic)},
        finished => {
          if (finished) {
            runOnJS(setIsMounted)(false);
          }
        },
      );
    }
  }, [visible, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: (1 - progress.value) * OFF_SCREEN_OFFSET}],
  }));

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      visible
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent>
      <Animated.View style={[styles.root, backdropStyle]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        />
      </Animated.View>
      <Animated.View
        style={[styles.sheetContainer, sheetStyle]}
        pointerEvents="box-none">
        <Animated.View style={contentStyle}>{children}</Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.sheetScrim,
  },
  sheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
