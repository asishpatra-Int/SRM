import {useLocalSearchParams} from "expo-router";

import {EventDetailsScreen} from "@/screens/explore";

export default function EventDetailsRoute() {
  const {eventId} = useLocalSearchParams<{eventId: string}>();
  return <EventDetailsScreen eventId={eventId} />;
}
