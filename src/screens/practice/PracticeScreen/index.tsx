import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";

import {AppText} from "@/components";
import {spacing, typography} from "@/core/theme";

import {
  MOCK_OTHER_TRACKS,
  MOCK_PRACTICE_TOPICS,
  MOCK_YOUR_PRACTICE_TRACKS,
} from "../mockData";

import {
  PracticeBackground,
  PracticeHeader,
  PracticeSearchRow,
  PracticeTopicFilterSheet,
  TrackListItem,
} from "./components";

export function PracticeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setFilterVisible] = useState(false);
  // Committed filter — drives the active-filter dot on the filter button.
  const [appliedTopicIds, setAppliedTopicIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  // Staged selection shown inside the open sheet; discarded unless Applied.
  const [draftTopicIds, setDraftTopicIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const openFilterSheet = () => {
    setDraftTopicIds(new Set(appliedTopicIds));
    setFilterVisible(true);
  };

  const toggleDraftTopic = (id: string) => {
    setDraftTopicIds(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const applyFilters = () => {
    setAppliedTopicIds(draftTopicIds);
    setFilterVisible(false);
  };

  const resetFilters = () => {
    setDraftTopicIds(new Set());
    setAppliedTopicIds(new Set());
  };

  return (
    <View style={styles.root}>
      <PracticeBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <PracticeHeader />
            <PracticeSearchRow
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFilterPress={openFilterSheet}
              hasActiveFilters={appliedTopicIds.size > 0}
            />
          </View>

          <View style={styles.trackList}>
            {MOCK_YOUR_PRACTICE_TRACKS.map(track => (
              <TrackListItem
                key={track.id}
                title={track.title}
                genre={track.genre}
                durationLabel={track.durationLabel}
                image={track.image}
                isDownloaded={track.isDownloaded}
              />
            ))}
          </View>

          <View style={styles.trackList}>
            <AppText style={typography.sectionLabel}>Other Tracks</AppText>
            {MOCK_OTHER_TRACKS.map(track => (
              <TrackListItem
                key={track.id}
                title={track.title}
                genre={track.genre}
                durationLabel={track.durationLabel}
                image={track.image}
                isDownloaded={track.isDownloaded}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <PracticeTopicFilterSheet
        visible={isFilterVisible}
        topics={MOCK_PRACTICE_TOPICS}
        selectedTopicIds={draftTopicIds}
        onToggleTopic={toggleDraftTopic}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={() => setFilterVisible(false)}
      />
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
  headerBlock: {
    gap: spacing.md,
  },
  trackList: {
    gap: spacing.md,
  },
});
