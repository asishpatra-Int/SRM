import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import BookmarkFilledIcon from "@/assets/svg/BookmarkFilledIcon.svg";
import CheckIcon from "@/assets/svg/CheckIcon.svg";
import DownloadIcon from "@/assets/svg/DownloadIcon.svg";
import PlayCircleIcon from "@/assets/svg/PlayCircleIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type SavedTrackCardProps = {
  title: string;
  genre: string;
  durationLabel: string;
  image: number;
  isDownloaded: boolean;
  onPress?: () => void;
  onDownloadPress?: () => void;
  onBookmarkPress?: () => void;
};

// Same card content as TrackListItem (Practice screen), but the Bookmarks
// and Downloads frames trail each row with a white play-circle button
// instead of a bare play triangle.
export function SavedTrackCard({
  title,
  genre,
  durationLabel,
  image,
  isDownloaded,
  onPress,
  onDownloadPress,
  onBookmarkPress,
}: SavedTrackCardProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={image} style={styles.thumbnail} contentFit="cover" />
      <View style={styles.details}>
        <View style={styles.titleBlock}>
          <AppText style={typography.listItemTitleMedium}>{title}</AppText>
          <AppText style={typography.trackMeta}>
            {genre} · {durationLabel}
          </AppText>
        </View>
        <View style={styles.actionsRow}>
          <View style={styles.actionsLeft}>
            <Pressable
              style={styles.actionCircle}
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
              style={styles.actionCircle}
              onPress={onBookmarkPress}
              accessibilityRole="button"
              accessibilityLabel="Bookmark">
              <BookmarkFilledIcon width={17} height={17} />
            </Pressable>
          </View>
          <PlayCircleIcon width={30} height={30} />
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
});
