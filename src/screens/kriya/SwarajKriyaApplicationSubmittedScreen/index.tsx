import {StyleSheet, Text, View} from "react-native";

import {Image} from "expo-image";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import splashPortrait from "@/assets/splash-portrait.png";
import {AppButton} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {KriyaLightBackground} from "../components";

// Figma's text block sits 188pt down the 874pt frame; this is that offset
// below a typical top inset, so it tracks the notch on every device.
const COPY_TOP_OFFSET = 129;

// Application received (Figma 1580:2233): confirmation copy over Sri Guru's
// portrait, with a way back to the Kriya tab.
export function SwarajKriyaApplicationSubmittedScreen() {
  const insets = useSafeAreaInsets();

  const handleBackToHome = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KriyaLightBackground />
      <View style={styles.portraitFrame} pointerEvents="none">
        <Image
          source={splashPortrait}
          style={styles.portrait}
          contentFit="fill"
          transition={0}
        />
      </View>

      <View style={[styles.copy, {marginTop: insets.top + COPY_TOP_OFFSET}]}>
        <Text style={styles.title} accessibilityRole="header">
          Congratulations!
        </Text>
        <Text style={styles.message}>
          {"We Have Received\nYour Application."}
        </Text>
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
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
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
