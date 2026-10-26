import {Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";

import {AppText} from "@/components";
import {colors} from "@/core/theme";

type EventCardProps = {
  title: string;
  location: string;
  dateTimeLabel: string;
  background: number;
  onPress?: () => void;
};

export function EventCard({
  title,
  location,
  dateTimeLabel,
  background,
  onPress,
}: EventCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={background}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={colors.exploreEventOverlayGradient}
        locations={colors.exploreEventOverlayLocations}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.meta}>{location}</AppText>
        <AppText style={styles.meta}>{dateTimeLabel}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 171,
    height: 214,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  content: {
    padding: 12,
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.textOnDark,
  },
  meta: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.exploreTextFaint,
  },
});
