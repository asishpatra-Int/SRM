import {StyleSheet, View} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";

import {colors, spacing, typography} from "@/core/theme";

import {AppText} from "./AppText";

type ComingSoonViewProps = {
  title: string;
};

export function ComingSoonView({title}: ComingSoonViewProps) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <AppText style={typography.listItemTitleSemibold}>{title}</AppText>
        <AppText style={styles.subtitle}>Coming soon</AppText>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xxl,
  },
  subtitle: {
    ...typography.cardSubtitle,
    opacity: 0.7,
  },
});
