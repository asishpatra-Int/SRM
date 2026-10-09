import {ScrollView, StyleSheet, View} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";

import SrmLogo from "@/assets/svg/SrmLogo.svg";
import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {
  AudioListItem,
  CompletionBadge,
  GlowBackground,
  PracticeCard,
} from "./components";
import {
  MOCK_GUIDED_AUDIOS,
  MOCK_PRACTICE_SESSIONS,
  MOCK_TIMES_COMPLETED_TODAY,
} from "./mockData";

export function KriyaLandingScreen() {
  return (
    <View style={styles.root}>
      <GlowBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <SrmLogo width={190} height={34} style={styles.logo} />

          <View style={styles.badgeBlock}>
            <CompletionBadge timesCompletedToday={MOCK_TIMES_COMPLETED_TODAY} />
            <View style={styles.cardsRow}>
              {MOCK_PRACTICE_SESSIONS.map(session => (
                <PracticeCard
                  key={session.id}
                  title={session.title}
                  subtitle={session.subtitle}
                  durationLabel={session.durationLabel}
                />
              ))}
            </View>
          </View>

          <View style={styles.prepareBlock}>
            <AppText style={typography.heading}>
              {"Prepare your\nmind before Kriya"}
            </AppText>
            <View style={styles.audioList}>
              {MOCK_GUIDED_AUDIOS.map(audio => (
                <AudioListItem
                  key={audio.id}
                  title={audio.title}
                  titleWeight={audio.titleWeight}
                />
              ))}
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
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: 140,
  },
  logo: {
    alignSelf: "center",
  },
  badgeBlock: {
    marginTop: 48,
    alignItems: "center",
    gap: spacing.xxl,
    width: "100%",
  },
  cardsRow: {
    flexDirection: "row",
    gap: spacing.md,
    width: "100%",
  },
  prepareBlock: {
    marginTop: 48,
    gap: spacing.xxxl,
  },
  audioList: {
    gap: spacing.md,
  },
});
