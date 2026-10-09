import {Pressable, StyleSheet, Text} from "react-native";

import PlaySymbol from "@/assets/svg/PlaySymbol.svg";
import {colors, radii, spacing, typography} from "@/core/theme";

type AudioListItemProps = {
  title: string;
  titleWeight?: "medium" | "semibold";
  onPress?: () => void;
};

export function AudioListItem({
  title,
  titleWeight = "semibold",
  onPress,
}: AudioListItemProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text
        style={[
          titleWeight === "semibold"
            ? typography.listItemTitleSemibold
            : typography.listItemTitleMedium,
          styles.title,
        ]}>
        {title}
      </Text>
      <PlaySymbol width={24} height={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: radii.sm,
    backgroundColor: colors.glassLight,
  },
  title: {
    color: colors.textPrimary,
  },
});
