import {useLocalSearchParams} from "expo-router";

import {PracticeContentDetailsScreen} from "@/screens/practice";

export default function ContentDetailsRoute() {
  const {contentId} = useLocalSearchParams<{contentId: string}>();
  return <PracticeContentDetailsScreen contentId={contentId} />;
}
