import {StyleSheet, View} from "react-native";

import {spacing} from "@/core/theme";
import {BlogRow} from "@/screens/explore/components";
import type {BlogPostMock} from "@/screens/explore/mockData";

type BlogsTabContentProps = {
  posts: BlogPostMock[];
  onPostPress: (blogId: string) => void;
};

export function BlogsTabContent({posts, onPostPress}: BlogsTabContentProps) {
  return (
    <View style={styles.list}>
      {posts.map(post => (
        <BlogRow
          key={post.id}
          dateLabel={post.dateLabel}
          title={post.title}
          thumbnail={post.thumbnail}
          hasLogoBadge={post.hasLogoBadge}
          onPress={() => onPostPress(post.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
});
