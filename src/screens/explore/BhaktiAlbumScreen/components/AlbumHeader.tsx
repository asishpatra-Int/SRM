import {Pressable, StyleSheet, View} from "react-native";

import AlbumBookmarkIcon from "@/assets/svg/explore/AlbumBookmarkIcon.svg";
import BackChevronIcon from "@/assets/svg/explore/BackChevronIcon.svg";
import MoreOptionsIcon from "@/assets/svg/explore/MoreOptionsIcon.svg";
import {colors} from "@/core/theme";

type AlbumHeaderProps = {
  onBackPress: () => void;
  onBookmarkPress?: () => void;
  onMorePress?: () => void;
};

export function AlbumHeader({
  onBackPress,
  onBookmarkPress,
  onMorePress,
}: AlbumHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable
        style={styles.backButton}
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <BackChevronIcon width={7} height={10} color={colors.pillLabelDark} />
      </Pressable>
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={onBookmarkPress}
          accessibilityRole="button"
          accessibilityLabel="Bookmark album">
          <AlbumBookmarkIcon
            width={13}
            height={14}
            color={colors.exploreIconDark}
          />
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={onMorePress}
          accessibilityRole="button"
          accessibilityLabel="More options">
          <MoreOptionsIcon
            width={18}
            height={5}
            color={colors.exploreIconDark}
          />
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
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.exploreBackButtonBackground,
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
