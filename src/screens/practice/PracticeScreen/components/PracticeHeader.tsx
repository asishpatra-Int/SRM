import {Pressable, StyleSheet, View} from "react-native";

import BookmarkOutlineIcon from "@/assets/svg/BookmarkOutlineIcon.svg";
import DownloadIcon from "@/assets/svg/DownloadIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type PracticeHeaderProps = {
  onBookmarksPress?: () => void;
  onDownloadsPress?: () => void;
};

export function PracticeHeader({
  onBookmarksPress,
  onDownloadsPress,
}: PracticeHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText style={[typography.pageHeading, styles.title]}>
        Your Practice
      </AppText>
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={onBookmarksPress}
          accessibilityRole="button"
          accessibilityLabel="Saved tracks">
          <BookmarkOutlineIcon width={14} height={14} />
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={onDownloadsPress}
          accessibilityRole="button"
          accessibilityLabel="Downloaded tracks">
          <DownloadIcon width={14} height={14} />
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
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.trackCardBackground,
  },
});
