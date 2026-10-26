import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import PlayCircleIcon from "@/assets/svg/PlayCircleIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type BhaktiTrackRowProps = {
  title: string;
  subtitle: string;
  trackCountLabel: string;
  artwork: number;
  onPress?: () => void;
};

export function BhaktiTrackRow({
  title,
  subtitle,
  trackCountLabel,
  artwork,
  onPress,
}: BhaktiTrackRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={artwork} style={styles.artwork} contentFit="cover" />
      <View style={styles.details}>
        <AppText style={[typography.listItemTitleMedium, styles.title]}>
          {title}
        </AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </View>
      <View style={styles.meta}>
        <AppText style={styles.metaLabel}>{trackCountLabel}</AppText>
        <PlayCircleIcon width={30} height={30} />
      </View>
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
  artwork: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: colors.pillLabelDark,
  },
  subtitle: {
    ...typography.trackMeta,
    color: colors.exploreTextMuted,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaLabel: {
    ...typography.trackMeta,
    fontSize: 12,
    color: colors.exploreTextMuted,
  },
});
