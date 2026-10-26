import {Pressable, StyleSheet, View} from "react-native";

import ChevronRightIcon from "@/assets/svg/explore/ChevronRightIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type SectionHeadingProps = {
  title: string;
  showChevron?: boolean;
  onPress?: () => void;
};

export function SectionHeading({
  title,
  showChevron = true,
  onPress,
}: SectionHeadingProps) {
  return (
    <View style={styles.row}>
      <AppText style={[typography.pageHeading, styles.title]}>{title}</AppText>
      {showChevron && (
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
          hitSlop={8}>
          <ChevronRightIcon width={7} height={10} color={colors.borderPurple} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    color: colors.borderPurple,
  },
});
