import {StyleSheet, View} from "react-native";

import {spacing} from "@/core/theme";
import {BhaktiTrackRow, SectionHeading} from "@/screens/explore/components";
import type {BhaktiTrackMock} from "@/screens/explore/mockData";

type BhaktiTabContentProps = {
  latestAlbums: BhaktiTrackMock[];
  suggestedAlbums: BhaktiTrackMock[];
  onAlbumPress: (albumId: string) => void;
};

export function BhaktiTabContent({
  latestAlbums,
  suggestedAlbums,
  onAlbumPress,
}: BhaktiTabContentProps) {
  return (
    <>
      <AlbumSection
        title="Latest Bhakti"
        albums={latestAlbums}
        onAlbumPress={onAlbumPress}
      />
      <AlbumSection
        title="You Might Like"
        albums={suggestedAlbums}
        onAlbumPress={onAlbumPress}
      />
    </>
  );
}

type AlbumSectionProps = {
  title: string;
  albums: BhaktiTrackMock[];
  onAlbumPress: (albumId: string) => void;
};

function AlbumSection({title, albums, onAlbumPress}: AlbumSectionProps) {
  return (
    <View style={styles.section}>
      <SectionHeading title={title} showChevron={false} />
      <View style={styles.list}>
        {albums.map(album => (
          <BhaktiTrackRow
            key={album.id}
            title={album.title}
            subtitle={album.subtitle}
            trackCountLabel={album.trackCountLabel}
            artwork={album.artwork}
            onPress={() => onAlbumPress(album.id)}
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
  list: {
    gap: spacing.md,
  },
});
