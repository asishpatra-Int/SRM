import {useLocalSearchParams} from "expo-router";

import {BlogDetailsScreen} from "@/screens/explore";

export default function BlogDetailsRoute() {
  const {blogId} = useLocalSearchParams<{blogId: string}>();
  return <BlogDetailsScreen blogId={blogId} />;
}
