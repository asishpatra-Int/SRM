import {Pressable, StyleSheet, View} from "react-native";

import BookmarkOutlineIcon from "@/assets/svg/BookmarkOutlineIcon.svg";
import ContentProgressBarIcon from "@/assets/svg/ContentProgressBarIcon.svg";
import DownloadIcon from "@/assets/svg/DownloadIcon.svg";
import PlayTriangleIcon from "@/assets/svg/PlayTriangleIcon.svg";
import {AppText} from "@/components";
import {colors, radii, typography} from "@/core/theme";

type ContentPlaybackRowProps = {
  durationLabel: string;
  onPlayPress?: () => void;
  onDownloadPress?: () => void;
  onBookmarkPress?: () => void;
};

export function ContentPlaybackRow({
  durationLabel,
  onPlayPress,
  onDownloadPress,
  onBookmarkPress,
}: ContentPlaybackRowProps) {
  return (
    <View style={styles.row}>
      <Pressable
        style={styles.pill}
        onPress={onPlayPress}
        accessibilityRole="button"
        accessibilityLabel={`Play ${durationLabel}`}>
        <AppText style={styles.pillLabel}>{durationLabel}</AppText>
        <ContentProgressBarIcon width={49} height={7} />
        <PlayTriangleIcon width={11} height={12} />
      </Pressable>
      <Pressable
        style={styles.actionCircle}
        onPress={onDownloadPress}
        accessibilityRole="button"
        accessibilityLabel="Download">
        <DownloadIcon width={17} height={17} />
      </Pressable>
      <Pressable
        style={styles.actionCircle}
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
});
