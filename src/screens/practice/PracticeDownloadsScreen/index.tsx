import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  PracticeHeroBackground,
  SavedTrackCard,
  SavedTracksHeader,
  SavedTracksSearchField,
} from "../components";
import {getDownloadedTracks} from "../mockData";

export function PracticeDownloadsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const downloadedTracks = getDownloadedTracks();

  const openContentDetails = (contentId: string) => {
    router.push({pathname: "/content/[contentId]", params: {contentId}});
  };

  return (
    <View style={styles.root}>
      <PracticeHeroBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <SavedTracksHeader
              title="Downloads"
              onBackPress={() => router.back()}
            />
            <SavedTracksSearchField
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.trackList}>
            {downloadedTracks.map(track => (
              <SavedTrackCard
                key={track.id}
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
    gap: spacing.xxl,
  },
  headerBlock: {
    gap: spacing.md,
  },
  trackList: {
    gap: spacing.md,
  },
});
