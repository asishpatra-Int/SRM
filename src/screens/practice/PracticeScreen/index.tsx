import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import {ExploreBackground} from "@/screens/explore/components";
import {useAuthStore} from "@/store";
import {usesLightPracticeTheme} from "@/utils";

import {
  MOCK_OTHER_TRACKS,
  MOCK_PRACTICE_TOPICS,
  MOCK_YOUR_PRACTICE_TRACKS,
} from "../mockData";

import {
  PracticeBackground,
  PracticeHeader,
  PracticeSearchRow,
  type PracticeTheme,
  PracticeTopicFilterSheet,
  TrackListItem,
} from "./components";

export function PracticeScreen() {
  const isGuest = useAuthStore(s => s.isGuest);
  const userType = useAuthStore(s => s.user?.userType);
  const theme: PracticeTheme = usesLightPracticeTheme(userType, isGuest)
    ? "light"
    : "dark";
  const isLight = theme === "light";

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

  const openContentDetails = (contentId: string) => {
    router.push({pathname: "/content/[contentId]", params: {contentId}});
  };

  return (
    <View style={styles.root}>
      <StatusBar style={isLight ? "dark" : "light"} />
      {isLight ? <ExploreBackground /> : <PracticeBackground />}
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <PracticeHeader
              theme={theme}
              onBookmarksPress={() => router.push("/bookmarks")}
              onDownloadsPress={() => router.push("/downloads")}
            />
            <PracticeSearchRow
              theme={theme}
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
                theme={theme}
                title={track.title}
                genre={track.genre}
                durationLabel={track.durationLabel}
                image={track.image}
                isDownloaded={track.isDownloaded}
                onPress={() => openContentDetails(track.id)}
              />
            ))}
          </View>

          <View style={styles.trackList}>
            <AppText
              style={[
                typography.sectionLabel,
                isLight && styles.sectionLabelLight,
              ]}>
              Other Tracks
            </AppText>
            {MOCK_OTHER_TRACKS.map(track => (
              <TrackListItem
                key={track.id}
                theme={theme}
                title={track.title}
                genre={track.genre}
                durationLabel={track.durationLabel}
                image={track.image}
                isDownloaded={track.isDownloaded}
                onPress={() => openContentDetails(track.id)}
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
  sectionLabelLight: {
    color: colors.borderPurple,
  },
});
