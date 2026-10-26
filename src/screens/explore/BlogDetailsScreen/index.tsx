import {ScrollView, StyleSheet, View} from "react-native";

import {Image} from "expo-image";
import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppText} from "@/components";
import {colors, radii, spacing, typography} from "@/core/theme";

import {BlogRow, ExploreBackground, SectionHeading} from "../components";
import {getBlogPostById, MOCK_BLOG_LIST} from "../mockData";

import {BlogDetailsHeader} from "./components";

type BlogDetailsScreenProps = {
  blogId?: string;
};

export function BlogDetailsScreen({blogId}: BlogDetailsScreenProps) {
  const post = getBlogPostById(blogId);
  const relatedPosts = MOCK_BLOG_LIST.filter(
    candidate => candidate.id !== post.id,
  ).slice(0, 3);

  const openBlog = (nextBlogId: string) => {
    router.push({pathname: "/blog/[blogId]", params: {blogId: nextBlogId}});
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
            <BlogDetailsHeader onBackPress={() => router.back()} />
            {post.thumbnail !== undefined && (
              <Image
                source={post.thumbnail}
                style={styles.heroImage}
                contentFit="cover"
              />
            )}
          </View>

          <View style={styles.body}>
            <View style={styles.titleBlock}>
              <View style={styles.badge}>
                <AppText style={styles.badgeLabel}>{post.category}</AppText>
              </View>
              <AppText style={[typography.detailTitle, styles.title]}>
                {post.title}
              </AppText>
              <AppText style={styles.date}>{post.dateLabel}</AppText>
            </View>

            <View style={styles.paragraphs}>
              {post.body.map((paragraph, index) => (
                <AppText key={index} style={styles.paragraph}>
                  {paragraph}
                </AppText>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeading title="Related Blogs" showChevron={false} />
            <View style={styles.relatedList}>
              {relatedPosts.map(related => (
                <BlogRow
                  key={related.id}
                  dateLabel={related.dateLabel}
                  title={related.title}
                  thumbnail={related.thumbnail}
                  hasLogoBadge={related.hasLogoBadge}
                  onPress={() => openBlog(related.id)}
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
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  heroImage: {
    width: "100%",
    height: 213,
    borderRadius: 8,
  },
  body: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xxl,
  },
  titleBlock: {
    gap: spacing.sm,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: colors.exploreBadgeBackground,
  },
  badgeLabel: {
    fontSize: 16,
    fontWeight: "400",
    textTransform: "capitalize",
    color: colors.exploreBadgeText,
  },
  title: {
    color: colors.borderPurple,
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.exploreTextMuted,
  },
  paragraphs: {
    gap: spacing.sm,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.pillLabelDark,
  },
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  relatedList: {
    gap: spacing.lg,
  },
});
