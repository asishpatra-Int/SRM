import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  BhaktiTrackRow,
  CategoryFilterChips,
  ExploreBackground,
  ExploreHeader,
  ExploreSearchBar,
  SectionHeading,
} from "../components";
import {MOCK_LATEST_BHAKTI} from "../mockData";
import {navigateToExploreCategory} from "../navigation";

export function BhaktiScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const openAlbum = (albumId: string) => {
    router.push({pathname: "/bhakti/[albumId]", params: {albumId}});
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <ExploreHeader title="Bhakti" />
            <ExploreSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <CategoryFilterChips
              selectedId="bhakti"
              onSelect={category =>
                navigateToExploreCategory("bhakti", category)
              }
            />
          </View>

          <View style={styles.section}>
            <SectionHeading title="Latest Bhakti" showChevron={false} />
            <View style={styles.trackList}>
              {MOCK_LATEST_BHAKTI.map(album => (
                <BhaktiTrackRow
                  key={album.id}
                  title={album.title}
                  subtitle={album.subtitle}
                  trackCountLabel={album.trackCountLabel}
                  artwork={album.artwork}
                  onPress={() => openAlbum(album.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeading title="You Might Like" showChevron={false} />
            <View style={styles.trackList}>
              {MOCK_LATEST_BHAKTI.map(album => (
                <BhaktiTrackRow
                  key={album.id}
                  title={album.title}
                  subtitle={album.subtitle}
                  trackCountLabel={album.trackCountLabel}
                  artwork={album.artwork}
                  onPress={() => openAlbum(album.id)}
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
});
