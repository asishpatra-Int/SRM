import {StyleSheet, Text, View} from "react-native";

import SrmHeaderLogoLarge from "@/assets/svg/SrmHeaderLogoLarge.svg";
import {colors, typography} from "@/core/theme";

// Splash stage 3 (Figma 1577:311): "Welcome to" + the SRM wordmark.
export function SplashWelcome() {
  return (
    <View style={styles.root} accessible accessibilityLabel="Welcome to SRM">
      <Text style={styles.title}>Welcome to</Text>
      <SrmHeaderLogoLarge width={150} height={50} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    ...typography.splashWelcome,
    color: colors.authTextBlack,
  },
});
