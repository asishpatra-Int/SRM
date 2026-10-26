import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type RandomTrackCardProps = {
  title: string;
  artwork: number;
  onPress?: () => void;
};

export function RandomTrackCard({
  title,
  artwork,
  onPress,
}: RandomTrackCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={artwork} style={styles.artwork} contentFit="cover" />
      <View style={styles.titleRow}>
        <AppText style={[typography.listItemTitleMedium, styles.title]}>
          {title}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: 12,
  },
  artwork: {
    width: "100%",
    aspectRatio: 125 / 103,
    borderRadius: 8,
  },
  titleRow: {
    alignItems: "center",
  },
  title: {
    color: colors.pillLabelDark,
    textAlign: "center",
  },
});
