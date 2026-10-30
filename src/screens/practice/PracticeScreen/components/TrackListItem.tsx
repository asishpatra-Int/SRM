import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import BookmarkFilledIcon from "@/assets/svg/BookmarkFilledIcon.svg";
import CheckIcon from "@/assets/svg/CheckIcon.svg";
import DownloadIcon from "@/assets/svg/DownloadIcon.svg";
import PlaySymbol from "@/assets/svg/PlaySymbol.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

import type {PracticeTheme} from "./practiceTheme";

type TrackListItemProps = {
  theme: PracticeTheme;
  title: string;
  genre: string;
  durationLabel: string;
  image: number;
  isDownloaded: boolean;
  onPress?: () => void;
  onDownloadPress?: () => void;
  onBookmarkPress?: () => void;
};

export function TrackListItem({
  theme,
  title,
  genre,
  durationLabel,
  image,
  isDownloaded,
  onPress,
  onDownloadPress,
  onBookmarkPress,
}: TrackListItemProps) {
  const isLight = theme === "light";
  const actionCircleStyle = [
    styles.actionCircle,
    isLight && styles.actionCircleLight,
  ];

  return (
    <Pressable
      style={[styles.row, isLight && styles.rowLight]}
      onPress={onPress}>
      <Image source={image} style={styles.thumbnail} contentFit="cover" />
      <View style={styles.details}>
        <View style={styles.titleBlock}>
          <AppText
            style={[
              typography.listItemTitleMedium,
              isLight && styles.titleLight,
            ]}>
            {title}
          </AppText>
          <AppText style={[typography.trackMeta, isLight && styles.metaLight]}>
            {genre} · {durationLabel}
          </AppText>
        </View>
        <View style={styles.actionsRow}>
          <View style={styles.actionsLeft}>
            <Pressable
              style={actionCircleStyle}
              onPress={onDownloadPress}
              accessibilityRole="button"
              accessibilityLabel={isDownloaded ? "Downloaded" : "Download"}>
              {isDownloaded ? (
                <CheckIcon width={17} height={17} />
              ) : (
                <DownloadIcon width={17} height={17} />
              )}
            </Pressable>
            <Pressable
              style={actionCircleStyle}
              onPress={onBookmarkPress}
              accessibilityRole="button"
              accessibilityLabel="Bookmark">
              <BookmarkFilledIcon width={17} height={17} />
            </Pressable>
          </View>
          <PlaySymbol width={30} height={30} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.trackCardBackground,
  },
  rowLight: {
    backgroundColor: colors.exploreGlassCardBackground,
  },
  titleLight: {
    color: colors.pillLabelDark,
  },
  metaLight: {
    color: colors.exploreTextMuted,
  },
  thumbnail: {
    width: 104,
    height: 89,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    gap: 8,
  },
  titleBlock: {
    gap: 6,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 4,
  },
  actionsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.trackActionBackground,
  },
  // The download/bookmark icons are white-only artwork, so on the light
  // card they sit on a solid brand-purple circle to stay legible.
  actionCircleLight: {
    backgroundColor: colors.borderPurple,
  },
});
