import {ScrollView, StyleSheet, View} from "react-native";

import {Image} from "expo-image";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {ExploreBackground} from "../components";
import {getBhaktiAlbumById} from "../mockData";

import {AlbumHeader, AlbumTrackRow} from "./components";

type BhaktiAlbumScreenProps = {
  albumId?: string;
};

export function BhaktiAlbumScreen({albumId}: BhaktiAlbumScreenProps) {
  const album = getBhaktiAlbumById(albumId);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <AlbumHeader onBackPress={() => router.back()} />

          <View style={styles.heroBlock}>
            <Image
              source={album.artwork}
              style={styles.artwork}
              contentFit="cover"
            />
            <View style={styles.titleBlock}>
              <AppText
                style={[typography.detailTitle, styles.title]}
                numberOfLines={1}>
                {album.fullTitle}
              </AppText>
              <AppText
                style={[typography.listItemTitleMedium, styles.subtitle]}>
                {album.subtitle}
              </AppText>
            </View>
            <AppButton
              label="Play Album"
              onPress={() => {}}
              style={styles.playButton}
            />
          </View>

          <View style={styles.trackList}>
            {album.tracks.map(track => (
              <AlbumTrackRow key={track.id} title={track.title} />
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
    paddingTop: spacing.xl,
    paddingBottom: 140,
    gap: spacing.xxxl,
  },
  heroBlock: {
    alignItems: "center",
    gap: spacing.md,
  },
  artwork: {
    width: 222,
    height: 222,
    borderRadius: 8,
  },
  titleBlock: {
    alignItems: "center",
    gap: spacing.sm,
    width: "100%",
  },
  title: {
    color: colors.pillLabelDark,
    textAlign: "center",
    width: "100%",
  },
  subtitle: {
    color: colors.exploreTextMuted,
    textAlign: "center",
  },
  playButton: {
    width: 222,
  },
  trackList: {
    gap: spacing.sm,
  },
});
