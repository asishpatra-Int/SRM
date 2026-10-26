import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {
  BlogRow,
  CategoryFilterChips,
  ExploreBackground,
  ExploreHeader,
  ExploreSearchBar,
} from "../components";
import {MOCK_BLOG_LIST} from "../mockData";
import {navigateToExploreCategory} from "../navigation";

export function BlogListingScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const openBlog = (blogId: string) => {
    router.push({pathname: "/blog/[blogId]", params: {blogId}});
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <ExploreHeader title="Blog" />
            <ExploreSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <CategoryFilterChips
              selectedId="blogs"
              onSelect={category =>
                navigateToExploreCategory("blogs", category)
              }
            />
          </View>

          <View style={styles.blogList}>
            {MOCK_BLOG_LIST.map(blog => (
              <BlogRow
                key={blog.id}
                dateLabel={blog.dateLabel}
                title={blog.title}
                thumbnail={blog.thumbnail}
                hasLogoBadge={blog.hasLogoBadge}
                onPress={() => openBlog(blog.id)}
              />
            ))}
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
    gap: spacing.xxl,
  },
  headerBlock: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  blogList: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
  },
});
