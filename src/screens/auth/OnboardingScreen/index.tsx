import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import SrmHeaderLogo from "@/assets/svg/SrmHeaderLogo.svg";
import {colors, spacing} from "@/core/theme";
import {useAuthStore} from "@/store";

import {AuthBackground} from "../components";
import {ONBOARDING_COPY} from "../mockData";

import {OnboardingCard} from "./components";

export function OnboardingScreen() {
  const enterGuestMode = useAuthStore(s => s.enterGuestMode);

  // Guest mode skips login/OTP; the root layout then opens Explore.
  const handleStartExploring = () => {
    enterGuestMode();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <AuthBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <SrmHeaderLogo width={93} height={31} />
          <OnboardingCard
            title={ONBOARDING_COPY.title}
            body={ONBOARDING_COPY.body}
            ctaLabel={ONBOARDING_COPY.ctaLabel}
            secondaryCtaLabel={ONBOARDING_COPY.secondaryCtaLabel}
            onCtaPress={handleStartExploring}
            onSecondaryCtaPress={handleLogin}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.authBackground,
  },
  safeArea: {
    flex: 1,
  },
  // Figma centres the logo + card in a block that starts 143pt down the
  // frame, i.e. ~80pt below the status bar, so it sits just under centre.
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 48,
    paddingHorizontal: spacing.xxl,
    paddingTop: 80,
    paddingBottom: spacing.lg,
  },
});
