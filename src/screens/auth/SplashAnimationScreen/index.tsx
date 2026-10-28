import {useEffect, useRef} from "react";

import {StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import {scheduleOnRN} from "react-native-worklets";

import {colors} from "@/core/theme";

import {SplashBackground, SplashPortrait, SplashWelcome} from "./components";

// One splash, three Figma stages (1577:261 → 285 → 311). Each stage only adds
// layers on top of the previous one, so the sequence is: background holds,
// the portrait + purple glow rise in, then "Welcome to SRM" fades in, holds,
// and the screen hands off to onboarding.
const STAGE_1_HOLD_MS = 600;
const PORTRAIT_IN_MS = 900;
const WELCOME_DELAY_MS = STAGE_1_HOLD_MS + PORTRAIT_IN_MS - 200;
const WELCOME_IN_MS = 700;
const FINAL_HOLD_MS = 1300;
// If the background somehow never reports load/error, start anyway.
const BACKGROUND_LOAD_TIMEOUT_MS = 1500;

const PORTRAIT_RISE = 60;
const WELCOME_RISE = 12;

export function SplashAnimationScreen() {
  const portraitProgress = useSharedValue(0);
  const welcomeProgress = useSharedValue(0);
  const hasStartedRef = useRef(false);
  const hasFinishedRef = useRef(false);

  const finishSplash = () => {
    if (hasFinishedRef.current) {
      return;
    }
    hasFinishedRef.current = true;
    // replace, not push: the splash must never be reachable via back.
    router.replace("/onboarding");
  };

  const startSequence = () => {
    if (hasStartedRef.current) {
      return;
    }
    hasStartedRef.current = true;

    portraitProgress.value = withDelay(
      STAGE_1_HOLD_MS,
      withTiming(1, {
        duration: PORTRAIT_IN_MS,
        easing: Easing.out(Easing.cubic),
      }),
    );
    welcomeProgress.value = withDelay(
      WELCOME_DELAY_MS,
      withSequence(
        withTiming(1, {
          duration: WELCOME_IN_MS,
          easing: Easing.out(Easing.quad),
        }),
        // No-op step that only exists to hold the final frame, then report.
        withDelay(
          FINAL_HOLD_MS,
          withTiming(1, {duration: 0}, isFinished => {
            if (isFinished) {
              scheduleOnRN(finishSplash);
            }
          }),
        ),
      ),
    );
  };

  useEffect(() => {
    const fallback = globalThis.setTimeout(
      startSequence,
      BACKGROUND_LOAD_TIMEOUT_MS,
    );
    return () => {
      globalThis.clearTimeout(fallback);
      // Cancelling reports isFinished=false, so no navigation fires after
      // the screen has gone.
      cancelAnimation(portraitProgress);
      cancelAnimation(welcomeProgress);
    };
    // Mount/unmount only — the sequence must never restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const portraitStyle = useAnimatedStyle(() => ({
    opacity: portraitProgress.value,
    transform: [
      {
        translateY: interpolate(
          portraitProgress.value,
          [0, 1],
          [PORTRAIT_RISE, 0],
        ),
      },
    ],
  }));

  const welcomeStyle = useAnimatedStyle(() => ({
    opacity: welcomeProgress.value,
    transform: [
      {
        translateY: interpolate(
          welcomeProgress.value,
          [0, 1],
          [WELCOME_RISE, 0],
        ),
      },
    ],
  }));

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SplashBackground onLoad={startSequence} />
      <Animated.View style={[StyleSheet.absoluteFill, portraitStyle]}>
        <SplashPortrait />
      </Animated.View>
      <Animated.View style={[styles.welcome, welcomeStyle]}>
        <SplashWelcome />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.authBackground,
  },
  // Figma: 354-wide block centred, top 160.
  welcome: {
    position: "absolute",
    top: 160,
    left: 0,
    right: 0,
  },
});
