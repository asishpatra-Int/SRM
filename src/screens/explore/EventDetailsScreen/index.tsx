import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {EventCard, ExploreBackground, SectionHeading} from "../components";
import {
  EVENT_DETAILS_HERO_IMAGE,
  getEventById,
  MOCK_EVENTS_UPCOMING,
} from "../mockData";

import {EventHero, EventInfoCard} from "./components";

type EventDetailsScreenProps = {
  eventId?: string;
};

export function EventDetailsScreen({eventId}: EventDetailsScreenProps) {
  const event = getEventById(eventId);
  const insets = useSafeAreaInsets();

  const openEvent = (nextEventId: string) => {
    router.push({
      pathname: "/events/[eventId]",
      params: {eventId: nextEventId},
    });
  };

  return (
    <View style={styles.root}>
      {/* This screen's hero photo is dark, unlike the rest of the
          Explore family — light status bar text reads better here. */}
      <StatusBar style="light" />
      <ExploreBackground />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <EventHero
          image={EVENT_DETAILS_HERO_IMAGE}
          onBackPress={() => router.back()}
        />

        <View style={styles.body}>
          <AppText style={[typography.detailTitle, styles.title]}>
            {event.title}
          </AppText>
          <EventInfoCard
            dateTimeLabel={event.dateTimeLabel}
            location={event.fullLocation ?? event.location}
            description={event.description ?? ""}
          />
        </View>

        <View style={styles.section}>
          <SectionHeading
            title="More Upcoming Events"
            onPress={() => router.push("/events")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}>
            {MOCK_EVENTS_UPCOMING.slice(0, 3).map(upcoming => (
              <EventCard
                key={upcoming.id}
                title={upcoming.title}
                location={upcoming.location}
                dateTimeLabel={upcoming.dateTimeLabel}
                background={upcoming.background}
                onPress={() => openEvent(upcoming.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {paddingBottom: Math.max(insets.bottom, spacing.md)},
        ]}>
        <AppButton label="Register Now" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
    gap: spacing.xxxl,
  },
  body: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xl,
  },
  title: {
    color: colors.borderPurple,
  },
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  horizontalList: {
    flexDirection: "row",
    gap: spacing.md,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.sm,
  },
});
