import {ScrollView, StyleSheet, Text, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import SrmHeaderLogo from "@/assets/svg/SrmHeaderLogo.svg";
import {colors, spacing, typography} from "@/core/theme";

import {KriyaLightBackground} from "../components";
import {MOCK_INTRODUCTION_VIDEOS, SWARAJ_KRIYA_INTRO_COPY} from "../mockData";

import {IntroductionVideoRow, SwarajKriyaHeroCard} from "./components";

// Kriya tab for Free and Premium users (Figma 1580:1214): an introduction to
// SwaRaj Kriya with the way in to the course application.
export function SwarajKriyaIntroScreen() {
  const handleApplyPress = () => {
    router.push("/swaraj-kriya-application");
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KriyaLightBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <SrmHeaderLogo width={93} height={31} style={styles.logo} />

          <View style={styles.body}>
            <View style={styles.inset}>
              <SwarajKriyaHeroCard
                eyebrow={SWARAJ_KRIYA_INTRO_COPY.eyebrow}
                title={SWARAJ_KRIYA_INTRO_COPY.title}
                body={SWARAJ_KRIYA_INTRO_COPY.body}
                continueLabel={SWARAJ_KRIYA_INTRO_COPY.continueLabel}
                applyLabel={SWARAJ_KRIYA_INTRO_COPY.applyLabel}
                onApplyPress={handleApplyPress}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                {SWARAJ_KRIYA_INTRO_COPY.sectionTitle}
              </Text>
              <View style={[styles.inset, styles.videoList]}>
                {MOCK_INTRODUCTION_VIDEOS.map(video => (
                  <IntroductionVideoRow
                    key={video.id}
                    title={video.title}
                    durationLabel={video.durationLabel}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.exploreBackground,
  },
  safeArea: {
    flex: 1,
  },
  // Figma: logo → 40 → card → 32 → section; tab bar clearance at the end.
  content: {
    paddingTop: spacing.xxl,
    paddingBottom: 140,
    gap: 40,
  },
  logo: {
    alignSelf: "center",
  },
  body: {
    gap: spacing.xxxl,
  },
  inset: {
    paddingHorizontal: spacing.xxl,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.pageHeading,
    color: colors.borderPurple,
    textAlign: "center",
    paddingHorizontal: spacing.xxl,
  },
  videoList: {
    gap: spacing.md,
  },
});
