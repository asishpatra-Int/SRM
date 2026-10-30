import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

import type {PracticeTheme} from "../../PracticeScreen/components";

type ContentSummaryRowProps = {
  theme: PracticeTheme;
  title: string;
  genre: string;
  durationLabel: string;
  image: number;
};

export function ContentSummaryRow({
  theme,
  title,
  genre,
  durationLabel,
  image,
}: ContentSummaryRowProps) {
  const isLight = theme === "light";

  return (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <AppText style={[typography.detailTitle, isLight && styles.titleLight]}>
          {title}
        </AppText>
        <AppText style={[typography.detailLabel, isLight && styles.metaLight]}>
          {genre} · {durationLabel}
        </AppText>
      </View>
      <Image source={image} style={styles.thumbnail} contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    width: "100%",
  },
  textBlock: {
    flex: 1,
    gap: 8,
  },
  // Explore detail screens' title/meta colours (BlogDetailsScreen).
  titleLight: {
    color: colors.borderPurple,
  },
  metaLight: {
    color: colors.exploreTextMuted,
  },
  thumbnail: {
    width: 129,
    height: 110,
    borderRadius: 8,
  },
});
