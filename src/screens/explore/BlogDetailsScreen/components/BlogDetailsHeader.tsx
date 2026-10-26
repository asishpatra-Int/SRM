import {Pressable, StyleSheet, View} from "react-native";

import AlbumBookmarkIcon from "@/assets/svg/explore/AlbumBookmarkIcon.svg";
import BackChevronIcon from "@/assets/svg/explore/BackChevronIcon.svg";
import {colors} from "@/core/theme";

type BlogDetailsHeaderProps = {
  onBackPress: () => void;
  onBookmarkPress?: () => void;
};

export function BlogDetailsHeader({
  onBackPress,
  onBookmarkPress,
}: BlogDetailsHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable
        style={styles.backButton}
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <BackChevronIcon width={7} height={10} color={colors.pillLabelDark} />
      </Pressable>
      <Pressable
        style={styles.actionButton}
        onPress={onBookmarkPress}
        accessibilityRole="button"
        accessibilityLabel="Bookmark blog">
        <AlbumBookmarkIcon
          width={13}
          height={14}
          color={colors.exploreIconDark}
        />
      </Pressable>
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
