import {StyleSheet, View} from "react-native";

import {spacing} from "@/core/theme";
import {EventCard, SectionHeading} from "@/screens/explore/components";
import type {UpcomingEventMock} from "@/screens/explore/mockData";

type EventsTabContentProps = {
  upcomingEvents: UpcomingEventMock[];
  pastEvents: UpcomingEventMock[];
  onEventPress: (eventId: string) => void;
};

export function EventsTabContent({
  upcomingEvents,
  pastEvents,
  onEventPress,
}: EventsTabContentProps) {
  return (
    <>
      <EventGridSection
        title="Upcoming Events"
        events={upcomingEvents}
        onEventPress={onEventPress}
      />
      <EventGridSection
        title="Past Events"
        events={pastEvents}
        onEventPress={onEventPress}
      />
    </>
  );
}

type EventGridSectionProps = {
  title: string;
  events: UpcomingEventMock[];
  onEventPress: (eventId: string) => void;
};

function EventGridSection({
  title,
  events,
  onEventPress,
}: EventGridSectionProps) {
  return (
    <View style={styles.section}>
      <SectionHeading title={title} showChevron={false} />
      <View style={styles.grid}>
        {events.map(event => (
          <EventCard
            key={event.id}
            title={event.title}
            location={event.location}
            dateTimeLabel={event.dateTimeLabel}
            background={event.background}
            onPress={() => onEventPress(event.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
});
