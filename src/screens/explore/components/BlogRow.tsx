import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import BlogLogoMark from "@/assets/svg/explore/BlogLogoMark.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type BlogRowProps = {
  dateLabel: string;
  title: string;
  thumbnail?: number;
  hasLogoBadge?: boolean;
  onPress?: () => void;
};

export function BlogRow({
  dateLabel,
  title,
  thumbnail,
  hasLogoBadge,
  onPress,
}: BlogRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.details}>
        <AppText style={styles.date}>{dateLabel}</AppText>
        <AppText style={[typography.listItemTitleMedium, styles.title]}>
          {title}
        </AppText>
      </View>
      {thumbnail !== undefined && (
        <View style={styles.thumbnailWrap}>
          <Image
            source={thumbnail}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          {hasLogoBadge && <BlogLogoMark width={55} height={19} />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.exploreDivider,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  date: {
    ...typography.trackMeta,
    color: colors.exploreTextMuted,
  },
  title: {
    color: colors.pillLabelDark,
  },
  thumbnailWrap: {
    width: 93,
    height: 56,
    borderRadius: 4,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
