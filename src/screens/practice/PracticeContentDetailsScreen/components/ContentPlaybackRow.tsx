import {Pressable, StyleSheet, View} from "react-native";

import BookmarkOutlineIcon from "@/assets/svg/BookmarkOutlineIcon.svg";
import ContentProgressBarIcon from "@/assets/svg/ContentProgressBarIcon.svg";
import DownloadIcon from "@/assets/svg/DownloadIcon.svg";
import PlayTriangleIcon from "@/assets/svg/PlayTriangleIcon.svg";
import {AppText} from "@/components";
import {colors, radii, typography} from "@/core/theme";

import type {PracticeTheme} from "../../PracticeScreen/components";

type ContentPlaybackRowProps = {
  theme: PracticeTheme;
  durationLabel: string;
  onPlayPress?: () => void;
  onDownloadPress?: () => void;
  onBookmarkPress?: () => void;
};

export function ContentPlaybackRow({
  theme,
  durationLabel,
  onPlayPress,
  onDownloadPress,
  onBookmarkPress,
}: ContentPlaybackRowProps) {
  const isLight = theme === "light";
  const actionCircleStyle = [
    styles.actionCircle,
    isLight && styles.actionCircleLight,
  ];

  return (
    <View style={styles.row}>
      <Pressable
        style={[styles.pill, isLight && styles.pillLight]}
        onPress={onPlayPress}
        accessibilityRole="button"
        accessibilityLabel={`Play ${durationLabel}`}>
        <AppText style={styles.pillLabel}>{durationLabel}</AppText>
        <ContentProgressBarIcon width={49} height={7} />
        <PlayTriangleIcon width={11} height={12} />
      </Pressable>
      <Pressable
        style={actionCircleStyle}
        onPress={onDownloadPress}
        accessibilityRole="button"
        accessibilityLabel="Download">
        <DownloadIcon width={17} height={17} />
      </Pressable>
      <Pressable
        style={actionCircleStyle}
        onPress={onBookmarkPress}
        accessibilityRole="button"
        accessibilityLabel="Bookmark">
        <BookmarkOutlineIcon width={17} height={17} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    backgroundColor: colors.textOnDark,
  },
  // The white pill would melt into the light background, so it takes
  // Explore's soft button shadow (ExploreSearchBar's filter button).
  pillLight: {
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  pillLabel: {
    ...typography.detailLabel,
    color: colors.pillLabelDark,
  },
  actionCircle: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.trackActionBackground,
  },
  // Same as TrackListItem: the icons are white-only artwork, so on the light
  // theme they sit on a solid brand-purple circle to stay legible.
  actionCircleLight: {
    backgroundColor: colors.borderPurple,
  },
});
