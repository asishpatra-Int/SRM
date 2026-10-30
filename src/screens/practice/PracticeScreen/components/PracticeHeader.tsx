import {Pressable, StyleSheet, View} from "react-native";

import BookmarkOutlineIcon from "@/assets/svg/BookmarkOutlineIcon.svg";
import DownloadIcon from "@/assets/svg/DownloadIcon.svg";
import LightBookmarkIcon from "@/assets/svg/explore/BookmarkIcon.svg";
import LightDownloadIcon from "@/assets/svg/explore/DownloadIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

import type {PracticeTheme} from "./practiceTheme";

type PracticeHeaderProps = {
  theme: PracticeTheme;
  onBookmarksPress?: () => void;
  onDownloadsPress?: () => void;
};

export function PracticeHeader({
  theme,
  onBookmarksPress,
  onDownloadsPress,
}: PracticeHeaderProps) {
  const isLight = theme === "light";
  const actionButtonStyle = [
    styles.actionButton,
    isLight && styles.actionButtonLight,
  ];

  return (
    <View style={styles.row}>
      <AppText
        style={[
          typography.pageHeading,
          styles.title,
          isLight && styles.titleLight,
        ]}>
        Your Practice
      </AppText>
      <View style={styles.actions}>
        <Pressable
          style={actionButtonStyle}
          onPress={onBookmarksPress}
          accessibilityRole="button"
          accessibilityLabel="Saved tracks">
          {isLight ? (
            <LightBookmarkIcon
              width={14}
              height={14}
              color={colors.exploreIconDark}
            />
          ) : (
            <BookmarkOutlineIcon width={14} height={14} />
          )}
        </Pressable>
        <Pressable
          style={actionButtonStyle}
          onPress={onDownloadsPress}
          accessibilityRole="button"
          accessibilityLabel="Downloaded tracks">
          {isLight ? (
            <LightDownloadIcon
              width={14}
              height={14}
              color={colors.exploreIconDark}
            />
          ) : (
            <DownloadIcon width={14} height={14} />
          )}
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
  titleLight: {
    color: colors.borderPurple,
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
  // Explore header's glass button (ExploreHeader).
  actionButtonLight: {
    backgroundColor: colors.exploreGlassButtonBackground,
  },
});
