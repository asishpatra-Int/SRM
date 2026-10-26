import {Pressable, StyleSheet} from "react-native";

import PlayCircleIcon from "@/assets/svg/PlayCircleIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

type AlbumTrackRowProps = {
  title: string;
  onPress?: () => void;
};

export function AlbumTrackRow({title, onPress}: AlbumTrackRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <AppText style={[typography.listItemTitleMedium, styles.title]}>
        {title}
      </AppText>
      <PlayCircleIcon width={24} height={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.exploreDivider,
  },
  title: {
    flex: 1,
    color: colors.pillLabelDark,
  },
});
