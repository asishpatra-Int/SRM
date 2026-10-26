import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import BackChevronIcon from "@/assets/svg/explore/BackChevronIcon.svg";
import MoreOptionsIcon from "@/assets/svg/explore/MoreOptionsIcon.svg";
import {colors} from "@/core/theme";

type EventHeroProps = {
  image: number;
  onBackPress: () => void;
  onMorePress?: () => void;
};

// Unlike every other Explore-family screen, this hero bleeds to the very
// top of the screen behind the status bar, so its back/more buttons sit on
// a light glass pill over the photo with white icons instead of dark ones.
export function EventHero({image, onBackPress, onMorePress}: EventHeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.hero}>
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={[styles.actionsRow, {paddingTop: insets.top + 16}]}>
        <Pressable
          style={styles.backButton}
          onPress={onBackPress}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <BackChevronIcon width={7} height={10} color={colors.textOnDark} />
        </Pressable>
        <Pressable
          style={styles.moreButton}
          onPress={onMorePress}
          accessibilityRole="button"
          accessibilityLabel="More options">
          <MoreOptionsIcon width={18} height={5} color={colors.textOnDark} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    height: 320,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.exploreBackButtonBackground,
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.exploreGlassButtonBackground,
  },
});
