import {StyleSheet, View} from "react-native";

import {spacing} from "@/core/theme";
import type {VideoListItemMock} from "@/screens/explore/mockData";

import {VideoListRow} from "./VideoListRow";

type VideosTabContentProps = {
  videos: VideoListItemMock[];
};

export function VideosTabContent({videos}: VideosTabContentProps) {
  return (
    <View style={styles.list}>
      {videos.map(video => (
        <VideoListRow
          key={video.id}
          title={video.title}
          dateLabel={video.dateLabel}
          thumbnail={video.thumbnail}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.xxl,
    paddingHorizontal: spacing.xxl,
  },
});
