import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import PlayCircleIcon from "@/assets/svg/PlayCircleIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type VideoThumbCardProps = {
  title: string;
  thumbnail: number;
  onPress?: () => void;
};

export function VideoThumbCard({
  title,
  thumbnail,
  onPress,
}: VideoThumbCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.thumbnailWrap}>
        <Image
          source={thumbnail}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <PlayCircleIcon width={30} height={30} />
      </View>
      <AppText style={[typography.listItemTitleMedium, styles.title]}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 171,
    gap: 12,
  },
  thumbnailWrap: {
    width: 171,
    height: 96,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.pillLabelDark,
    textAlign: "center",
  },
});
