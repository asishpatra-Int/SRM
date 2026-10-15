import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {PracticeBackButton} from "../components";
import {getPracticeTrackById, MOCK_LISTENING_RITUAL} from "../mockData";

import {
  ContentDetailsBackground,
  ContentPlaybackRow,
  ContentSummaryRow,
  ListeningRitualCard,
} from "./components";

type PracticeContentDetailsScreenProps = {
  contentId?: string;
};

export function PracticeContentDetailsScreen({
  contentId,
}: PracticeContentDetailsScreenProps) {
  const track = getPracticeTrackById(contentId);

  return (
    <View style={styles.root}>
      <ContentDetailsBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <PracticeBackButton onPress={() => router.back()} />

          <View style={styles.summaryBlock}>
            <ContentSummaryRow
              title={track.title}
              genre={track.genre}
              durationLabel={track.durationLabel}
              image={track.image}
            />
            <ContentPlaybackRow durationLabel={track.pillDurationLabel} />
          </View>

          <View style={styles.descriptionBlock}>
            {track.description.map(paragraph => (
              <AppText key={paragraph.id} style={styles.descriptionText}>
                {paragraph.text}
              </AppText>
            ))}
          </View>

          <ListeningRitualCard steps={MOCK_LISTENING_RITUAL} />
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
});
