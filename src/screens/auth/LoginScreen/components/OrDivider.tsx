import {StyleSheet, Text, View} from "react-native";

import {colors, typography} from "@/core/theme";

// Figma "Divider" 1580:930: two hairlines either side of "Or".
export function OrDivider() {
  return (
    <View style={styles.root}>
      <View style={styles.line} />
      <Text style={styles.label}>Or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.authDividerLine,
  },
  label: {
    ...typography.dividerLabel,
    color: colors.authDividerLabel,
  },
});
