import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  CategoryFilterChips,
  ExploreBackground,
  ExploreHeader,
  ExploreSearchBar,
} from "../components";
import {MOCK_VIDEO_LIST} from "../mockData";
import {navigateToExploreCategory} from "../navigation";

import {VideoListRow} from "./components";

export function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <ExploreHeader title="Videos" />
            <ExploreSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <CategoryFilterChips
              selectedId="videos"
              onSelect={category =>
                navigateToExploreCategory("videos", category)
              }
            />
          </View>

          <View style={styles.videoList}>
            {MOCK_VIDEO_LIST.map(video => (
              <VideoListRow
                key={video.id}
                title={video.title}
                dateLabel={video.dateLabel}
                thumbnail={video.thumbnail}
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
    paddingTop: spacing.xl,
    paddingBottom: 140,
    gap: spacing.xxxl,
  },
  headerBlock: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  videoList: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xxl,
  },
});
