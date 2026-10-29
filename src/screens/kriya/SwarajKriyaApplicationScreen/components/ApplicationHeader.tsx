import {Pressable, StyleSheet, Text, View} from "react-native";

import BackChevronIcon from "@/assets/svg/explore/BackChevronIcon.svg";
import {colors, spacing, typography} from "@/core/theme";

type ApplicationHeaderProps = {
  title: string;
  onBackPress: () => void;
};

// Figma 1580:1868: glass back button (same as the Explore detail headers)
// beside the page title.
export function ApplicationHeader({
  title,
  onBackPress,
}: ApplicationHeaderProps) {
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
