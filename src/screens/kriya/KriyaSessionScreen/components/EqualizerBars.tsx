import {StyleSheet, View} from "react-native";

import {colors} from "@/core/theme";

const BAR_HEIGHTS = [7.21, 15.45, 22.67, 15.45, 7.21];

export function EqualizerBars() {
  return (
    <View style={styles.row}>
      {BAR_HEIGHTS.map((height, index) => (
        <View key={index} style={[styles.bar, {height}]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  bar: {
    width: 2,
    borderRadius: 1,
    backgroundColor: colors.equalizerBar,
  },
});
