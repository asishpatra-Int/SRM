import {Pressable, StyleSheet, View} from "react-native";

import BookmarkIcon from "@/assets/svg/explore/BookmarkIcon.svg";
import DownloadIcon from "@/assets/svg/explore/DownloadIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type ExploreHeaderProps = {
  title: string;
  onBookmarksPress?: () => void;
  onDownloadsPress?: () => void;
};

// Shared by every Explore-family screen (Explore, Videos, Bhakti, Events) —
// only the title text changes.
export function ExploreHeader({
  title,
  onBookmarksPress,
  onDownloadsPress,
}: ExploreHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText style={[typography.pageHeading, styles.title]}>{title}</AppText>
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={onBookmarksPress}
          accessibilityRole="button"
          accessibilityLabel="Bookmarked content">
          <BookmarkIcon width={14} height={14} color={colors.exploreIconDark} />
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={onDownloadsPress}
          accessibilityRole="button"
          accessibilityLabel="Downloaded content">
          <DownloadIcon width={14} height={14} color={colors.exploreIconDark} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    color: colors.borderPurple,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.exploreGlassButtonBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
});
