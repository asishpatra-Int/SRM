import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  CategoryFilterChips,
  EventCard,
  ExploreBackground,
  ExploreHeader,
  ExploreSearchBar,
  SectionHeading,
} from "../components";
import {MOCK_EVENTS_PAST, MOCK_EVENTS_UPCOMING} from "../mockData";
import {navigateToExploreCategory} from "../navigation";

export function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <ExploreHeader title="Events" />
            <ExploreSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <CategoryFilterChips
              selectedId="events"
              onSelect={category =>
                navigateToExploreCategory("events", category)
              }
            />
          </View>

          <View style={styles.section}>
            <SectionHeading title="Upcoming Events" />
            <View style={styles.eventGrid}>
              {MOCK_EVENTS_UPCOMING.map(event => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  location={event.location}
                  dateTimeLabel={event.dateTimeLabel}
                  background={event.background}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeading title="Past Events" />
            <View style={styles.eventGrid}>
              {MOCK_EVENTS_PAST.map(event => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  location={event.location}
                  dateTimeLabel={event.dateTimeLabel}
                  background={event.background}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.xl,
    paddingBottom: 140,
    gap: spacing.xxxl,
  },
  headerBlock: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  eventGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
});
