import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import {AppText} from "@/components";
import {typography} from "@/core/theme";

type ContentSummaryRowProps = {
  title: string;
  genre: string;
  durationLabel: string;
  image: number;
};

export function ContentSummaryRow({
  title,
  genre,
  durationLabel,
  image,
}: ContentSummaryRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <AppText style={typography.detailTitle}>{title}</AppText>
        <AppText style={typography.detailLabel}>
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
  thumbnail: {
    width: 129,
    height: 110,
    borderRadius: 8,
  },
});
