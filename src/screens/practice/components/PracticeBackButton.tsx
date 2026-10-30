import {Pressable, StyleSheet} from "react-native";

import ChevronLeftIcon from "@/assets/svg/ChevronLeftIcon.svg";
import BackChevronIcon from "@/assets/svg/explore/BackChevronIcon.svg";
import {colors} from "@/core/theme";

import type {PracticeTheme} from "../PracticeScreen/components";

type PracticeBackButtonProps = {
  onPress: () => void;
  theme?: PracticeTheme;
};

export function PracticeBackButton({
  onPress,
  theme = "dark",
}: PracticeBackButtonProps) {
  const isLight = theme === "light";

  return (
    <Pressable
      style={[styles.circle, isLight && styles.circleLight]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back">
      {isLight ? (
        <BackChevronIcon width={7} height={10} color={colors.pillLabelDark} />
      ) : (
        <ChevronLeftIcon width={7} height={10} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.trackActionBackground,
  },
  // Explore detail screens' back button (BlogDetailsHeader).
  circleLight: {
    backgroundColor: colors.exploreBackButtonBackground,
  },
});
