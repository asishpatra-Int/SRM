import {Pressable, StyleSheet, Text, View} from "react-native";

import BackChevronIcon from "@/assets/svg/explore/BackChevronIcon.svg";
import {colors, spacing, typography} from "@/core/theme";

type ProfileSubpageHeaderProps = {
  title: string;
  onBackPress: () => void;
};

// Figma 1643:13132 / 1643:13310: glass back button beside the page title,
// as on the Explore detail and SwaRaj Kriya application headers.
export function ProfileSubpageHeader({
  title,
  onBackPress,
}: ProfileSubpageHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable
        style={styles.backButton}
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}>
        <BackChevronIcon width={7} height={10} color={colors.pillLabelDark} />
      </Pressable>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.exploreBackButtonBackground,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
        color: colors.glassHighlight,
        inset: true,
      },
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  title: {
    ...typography.pageHeading,
    color: colors.borderPurple,
  },
});
