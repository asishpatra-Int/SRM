import {useLocalSearchParams} from "expo-router";

import {KriyaSessionScreen} from "@/screens/kriya";

export default function SessionRoute() {
  const {practiceId} = useLocalSearchParams<{practiceId: string}>();
  return <KriyaSessionScreen practiceId={practiceId} />;
}
