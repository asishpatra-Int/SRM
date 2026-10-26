import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  BhaktiTrackRow,
  CategoryFilterChips,
  EventCard,
  ExploreBackground,
  ExploreHeader,
  ExploreSearchBar,
  SectionHeading,
} from "../components";
import {
  MOCK_FEATURED_ITEMS,
  MOCK_LATEST_BHAKTI,
  MOCK_LATEST_BLOGS,
  MOCK_LATEST_VIDEOS,
  MOCK_RANDOM_PLAY,
  MOCK_UPCOMING_EVENTS,
} from "../mockData";
import {navigateToExploreCategory} from "../navigation";

import {
  BlogRow,
  FeaturedCarousel,
  RandomTrackCard,
  VideoThumbCard,
} from "./components";

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const openAlbum = (albumId: string) => {
    router.push({pathname: "/bhakti/[albumId]", params: {albumId}});
  };

  return (
    <View style={styles.root}>
      {/* Every other tab is dark; this is the one light-themed screen. */}
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <ExploreHeader title="Explore SRM" />
            <ExploreSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <CategoryFilterChips
              selectedId="all"
              onSelect={category => navigateToExploreCategory("all", category)}
            />
          </View>

          <View style={styles.section}>
            <SectionHeading title="Featured" showChevron={false} />
            <FeaturedCarousel items={MOCK_FEATURED_ITEMS} />
          </View>

          <View style={styles.section}>
            <SectionHeading
              title="Latest Bhakti"
              onPress={() => router.push("/bhakti")}
            />
            <View style={styles.trackList}>
              {MOCK_LATEST_BHAKTI.map(track => (
                <BhaktiTrackRow
                  key={track.id}
                  title={track.title}
                  subtitle={track.subtitle}
                  trackCountLabel={track.trackCountLabel}
                  artwork={track.artwork}
                  onPress={() => openAlbum(track.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeading title="Random Play" />
            <View style={styles.randomGrid}>
              {MOCK_RANDOM_PLAY.map(track => (
                <RandomTrackCard
                  key={track.id}
                  title={track.title}
                  artwork={track.artwork}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeading
              title="Upcoming Events"
              onPress={() => router.push("/events")}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}>
              {MOCK_UPCOMING_EVENTS.map(event => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  location={event.location}
                  dateTimeLabel={event.dateTimeLabel}
                  background={event.background}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeading
              title="Latest Videos"
              onPress={() => router.push("/videos")}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}>
              {MOCK_LATEST_VIDEOS.map(video => (
                <VideoThumbCard
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeading title="Latest Blogs" />
            <View style={styles.blogList}>
              {MOCK_LATEST_BLOGS.map(blog => (
                <BlogRow
                  key={blog.id}
                  dateLabel={blog.dateLabel}
                  title={blog.title}
                  thumbnail={blog.thumbnail}
                  hasLogoBadge={blog.hasLogoBadge}
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
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  trackList: {
    gap: spacing.md,
  },
  randomGrid: {
    flexDirection: "row",
    gap: spacing.md,
  },
  horizontalList: {
    flexDirection: "row",
    gap: spacing.md,
  },
  blogList: {
    gap: spacing.lg,
  },
});
