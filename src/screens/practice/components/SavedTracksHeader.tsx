import {StyleSheet, View} from "react-native";

import {AppText} from "@/components";
import {typography} from "@/core/theme";

import {PracticeBackButton} from "./PracticeBackButton";

type SavedTracksHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export function SavedTracksHeader({
  title,
  onBackPress,
}: SavedTracksHeaderProps) {
  return (
    <View style={styles.row}>
      <PracticeBackButton onPress={onBackPress} />
      <AppText style={typography.pageHeading}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
