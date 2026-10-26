import {Pressable, StyleSheet, View} from "react-native";

import EventCalendarIcon from "@/assets/svg/explore/EventCalendarIcon.svg";
import LocationPinIcon from "@/assets/svg/explore/LocationPinIcon.svg";
import {AppText} from "@/components";
import {colors, radii, spacing} from "@/core/theme";

type EventInfoCardProps = {
  dateTimeLabel: string;
  location: string;
  description: string;
  onExplorePastEventPress?: () => void;
};

export function EventInfoCard({
  dateTimeLabel,
  location,
  description,
  onExplorePastEventPress,
}: EventInfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.metaRow}>
        <EventCalendarIcon width={18} height={20} color={colors.borderPurple} />
        <AppText style={styles.metaText}>{dateTimeLabel}</AppText>
      </View>
      <View style={styles.metaRow}>
        <LocationPinIcon width={16} height={20} color={colors.borderPurple} />
        <AppText style={styles.metaText}>{location}</AppText>
      </View>
      <AppText style={styles.description}>{description}</AppText>
      <Pressable onPress={onExplorePastEventPress}>
        <AppText style={styles.link}>Explore Past Event</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    gap: spacing.md,
    padding: 20,
    borderRadius: radii.sheetTop,
    backgroundColor: colors.exploreGlassCardBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  metaText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: colors.pillLabelDark,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.pillLabelDark,
  },
  link: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.borderPurple,
    textDecorationLine: "underline",
  },
});
