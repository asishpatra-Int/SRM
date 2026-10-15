import {Pressable, StyleSheet} from "react-native";

import ChevronLeftIcon from "@/assets/svg/ChevronLeftIcon.svg";
import {colors} from "@/core/theme";

type PracticeBackButtonProps = {
  onPress: () => void;
};

export function PracticeBackButton({onPress}: PracticeBackButtonProps) {
  return (
    <Pressable
      style={styles.circle}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back">
      <ChevronLeftIcon width={7} height={10} />
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
});
