import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import ThreeDotsVerticalIcon from "@/assets/svg/explore/ThreeDotsVerticalIcon.svg";
import PlayCircleIcon from "@/assets/svg/PlayCircleIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type VideoListRowProps = {
  title: string;
  dateLabel: string;
  thumbnail: number;
  onPress?: () => void;
};

export function VideoListRow({
  title,
  dateLabel,
  thumbnail,
  onPress,
}: VideoListRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.thumbnailWrap}>
        <Image
          source={thumbnail}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <PlayCircleIcon width={30} height={30} />
      </View>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <AppText
            style={[typography.listItemTitleMedium, styles.title]}
            numberOfLines={1}>
            {title}
          </AppText>
          <View style={styles.menuIcon}>
            <ThreeDotsVerticalIcon
              width={4}
              height={18}
              color={colors.exploreTextMuted}
            />
          </View>
        </View>
        <AppText style={styles.date}>{dateLabel}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  thumbnailWrap: {
    width: 150,
    height: 84,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    color: colors.pillLabelDark,
  },
  menuIcon: {
    transform: [{rotate: "90deg"}],
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.exploreTextMuted,
  },
});
