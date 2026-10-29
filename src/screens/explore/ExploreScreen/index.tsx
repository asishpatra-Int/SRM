import {useRef, useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  BhaktiTrackRow,
  BlogRow,
  CategoryFilterChips,
  EventCard,
  ExploreBackground,
  ExploreHeader,
  ExploreSearchBar,
  SectionHeading,
} from "../components";
import {
  type ExploreCategoryId,
  MOCK_BLOG_LIST,
  MOCK_EVENTS_PAST,
  MOCK_EVENTS_UPCOMING,
  MOCK_FEATURED_ITEMS,
  MOCK_LATEST_BHAKTI,
  MOCK_LATEST_BLOGS,
  MOCK_LATEST_VIDEOS,
  MOCK_RANDOM_PLAY,
  MOCK_UPCOMING_EVENTS,
  MOCK_VIDEO_LIST,
} from "../mockData";

import {
  BhaktiTabContent,
  BlogsTabContent,
  EventsTabContent,
  FeaturedCarousel,
  RandomTrackCard,
  VideosTabContent,
  VideoThumbCard,
} from "./components";

// The header names the selected category, as each category's Figma frame
// does.
const HEADER_TITLES: Record<ExploreCategoryId, string> = {
  all: "Explore SRM",
  videos: "Videos",
  bhakti: "Bhakti",
  events: "Events",
  blogs: "Blog",
};

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExploreCategoryId>("all");
  const scrollRef = useRef<ScrollView>(null);

  // "All" shows a preview of every category; each other chip swaps in that
  // category's full listing on this same screen, per its Figma frame.
  const showAll = selectedCategory === "all";

  // A section's chevron selects that section's chip rather than opening a
  // separate page, then scrolls back up so the selected chip stays visible.
  const selectCategory = (categoryId: ExploreCategoryId) => {
    setSelectedCategory(categoryId);
    scrollRef.current?.scrollTo({y: 0, animated: true});
  };

  const openAlbum = (albumId: string) => {
    router.push({pathname: "/bhakti/[albumId]", params: {albumId}});
  };

  const openEvent = (eventId: string) => {
    router.push({pathname: "/events/[eventId]", params: {eventId}});
  };

  const openBlog = (blogId: string) => {
    router.push({pathname: "/blog/[blogId]", params: {blogId}});
  };

  return (
    <View style={styles.root}>
      {/* Every other tab is dark; this is the one light-themed screen. */}
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={[
            styles.content,
            selectedCategory === "blogs" && styles.contentCompact,
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <View style={styles.headerInset}>
              <ExploreHeader title={HEADER_TITLES[selectedCategory]} />
              <ExploreSearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <CategoryFilterChips
              selectedId={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>

          {showAll && (
            <>
              <View style={styles.section}>
                <SectionHeading title="Featured" showChevron={false} />
                <FeaturedCarousel items={MOCK_FEATURED_ITEMS} />
              </View>

              <View style={styles.section}>
                <SectionHeading
                  title="Latest Bhakti"
                  onPress={() => selectCategory("bhakti")}
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
                <SectionHeading title="Random Play" showChevron={false} />
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
                  onPress={() => selectCategory("events")}
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
                      onPress={() => openEvent(event.id)}
                    />
                  ))}
                </ScrollView>
              </View>

              <View style={styles.section}>
                <SectionHeading
                  title="Latest Videos"
                  onPress={() => selectCategory("videos")}
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
                <SectionHeading
                  title="Latest Blogs"
                  onPress={() => selectCategory("blogs")}
                />
                <View style={styles.blogList}>
                  {MOCK_LATEST_BLOGS.map(blog => (
                    <BlogRow
                      key={blog.id}
                      dateLabel={blog.dateLabel}
                      title={blog.title}
                      thumbnail={blog.thumbnail}
                      hasLogoBadge={blog.hasLogoBadge}
                      onPress={() => openBlog(blog.id)}
                    />
                  ))}
                </View>
              </View>
            </>
          )}

          {selectedCategory === "videos" && (
            <VideosTabContent videos={MOCK_VIDEO_LIST} />
          )}

          {selectedCategory === "bhakti" && (
            <BhaktiTabContent
              latestAlbums={MOCK_LATEST_BHAKTI}
              suggestedAlbums={MOCK_LATEST_BHAKTI}
              onAlbumPress={openAlbum}
            />
          )}

          {selectedCategory === "events" && (
            <EventsTabContent
              upcomingEvents={MOCK_EVENTS_UPCOMING}
              pastEvents={MOCK_EVENTS_PAST}
              onEventPress={openEvent}
            />
          )}

          {selectedCategory === "blogs" && (
            <BlogsTabContent posts={MOCK_BLOG_LIST} onPostPress={openBlog} />
          )}
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
  // The Blog listing frame sits its rows closer to the header.
  contentCompact: {
    gap: spacing.xxl,
  },
  // Unpadded so the category chips can scroll the full screen width.
  headerBlock: {
    gap: spacing.md,
  },
  headerInset: {
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
