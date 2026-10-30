import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import {ExploreBackground} from "@/screens/explore/components";
import {useAuthStore} from "@/store";
import {usesLightPracticeTheme} from "@/utils";

import {PracticeBackButton} from "../components";
import {getPracticeTrackById, MOCK_LISTENING_RITUAL} from "../mockData";

import {
  ContentDetailsBackground,
  ContentPlaybackRow,
  ContentSummaryRow,
  ListeningRitualCard,
} from "./components";

import type {PracticeTheme} from "../PracticeScreen/components";

type PracticeContentDetailsScreenProps = {
  contentId?: string;
};

export function PracticeContentDetailsScreen({
  contentId,
}: PracticeContentDetailsScreenProps) {
  const isGuest = useAuthStore(s => s.isGuest);
  const userType = useAuthStore(s => s.user?.userType);
  // Follows the Practice tab it was opened from (see PracticeScreen).
  const theme: PracticeTheme = usesLightPracticeTheme(userType, isGuest)
    ? "light"
    : "dark";
  const isLight = theme === "light";
  const track = getPracticeTrackById(contentId);

  return (
    <View style={styles.root}>
      <StatusBar style={isLight ? "dark" : "light"} />
      {isLight ? <ExploreBackground /> : <ContentDetailsBackground />}
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <PracticeBackButton theme={theme} onPress={() => router.back()} />

          <View style={styles.summaryBlock}>
            <ContentSummaryRow
              theme={theme}
              title={track.title}
              genre={track.genre}
              durationLabel={track.durationLabel}
              image={track.image}
            />
            <ContentPlaybackRow
              theme={theme}
              durationLabel={track.pillDurationLabel}
            />
          </View>

          <View style={styles.descriptionBlock}>
            {track.description.map(paragraph => (
              <AppText
                key={paragraph.id}
                style={[
                  styles.descriptionText,
                  isLight && styles.descriptionTextLight,
                ]}>
                {paragraph.text}
              </AppText>
            ))}
          </View>

          <ListeningRitualCard theme={theme} steps={MOCK_LISTENING_RITUAL} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: 140,
    gap: spacing.xxxl,
  },
  summaryBlock: {
    gap: spacing.xxl,
  },
  descriptionBlock: {
    gap: 18,
  },
  descriptionText: {
    ...typography.detailBody,
    color: colors.contentDescription,
  },
  descriptionTextLight: {
    color: colors.pillLabelDark,
  },
});
