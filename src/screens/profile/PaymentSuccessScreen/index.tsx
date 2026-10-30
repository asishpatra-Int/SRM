import {StyleSheet, Text, View} from "react-native";

import {Image} from "expo-image";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import splashPortrait from "@/assets/splash-portrait.png";
import {AppButton} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {ProfileLuminousBackground} from "../components";

// Figma's copy block sits 100pt down the 874pt frame; this is that offset
// below a typical top inset, so it tracks the notch on every device.
const COPY_TOP_OFFSET = 41;
// Figma reserves a 132pt slot above the title for a Lottie celebration
// animation; its exported preview frame is blank and Lottie isn't a
// project dependency, so the slot is kept as space to hold the layout.
const CELEBRATION_SLOT_SIZE = 132;

// Payment Done (Figma 1640:12188): confirmation copy over Sri Guru's
// portrait, shown after the mock subscription purchase.
export function PaymentSuccessScreen() {
  const insets = useSafeAreaInsets();

  // Unwinds to the home tabs (Kriya) — or opens them, if this screen was
  // reached without that history.
  const handleBackToHome = () => {
    router.dismissTo("/");
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ProfileLuminousBackground />
      <View style={styles.portraitFrame} pointerEvents="none">
        <Image
          source={splashPortrait}
          style={styles.portrait}
          contentFit="fill"
          transition={0}
        />
      </View>

      <View style={[styles.copy, {marginTop: insets.top + COPY_TOP_OFFSET}]}>
        <View style={styles.celebrationSlot} />
        <Text style={styles.title} accessibilityRole="header">
          Congratulations!
        </Text>
        <Text style={styles.message}>{"We Have Received\nYour Payment."}</Text>
      </View>

      <View
        style={[
          styles.footer,
          {paddingBottom: Math.max(insets.bottom, spacing.md)},
        ]}>
        <AppButton label="Back to Home" onPress={handleBackToHome} />
      </View>
    </View>
  );
}

const PORTRAIT_WIDTH = 402;
const PORTRAIT_HEIGHT = 469;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.exploreBackground,
  },
  // Same 402×469 bottom-anchored crop as the splash portrait.
  portraitFrame: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: PORTRAIT_WIDTH,
    height: PORTRAIT_HEIGHT,
    overflow: "hidden",
  },
  // Crop: h 100%, left -117.74%, w 244.61%.
  portrait: {
    position: "absolute",
    top: 0,
    left: -473.3,
    width: 983.33,
    height: PORTRAIT_HEIGHT,
  },
  copy: {
    alignItems: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  celebrationSlot: {
    width: CELEBRATION_SLOT_SIZE,
    height: CELEBRATION_SLOT_SIZE,
  },
  title: {
    ...typography.confirmationTitle,
    color: colors.borderPurple,
  },
  message: {
    ...typography.detailTitle,
    color: colors.authTextBlack,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xxl,
    paddingTop: 10,
  },
});
