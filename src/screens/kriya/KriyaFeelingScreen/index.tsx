import {StyleSheet, Text, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {MoodBackground, MoodSlider} from "../components";
import {MOCK_KRIYA_FEELING_NOW} from "../mockData";

// Ends the Kriya flow (Get Ready -> Session -> Mood -> Improve -> Feeling)
// and returns home.
function handleNext() {
  router.dismissAll();
}

export function KriyaFeelingScreen() {
  return (
    <View style={styles.root}>
      <MoodBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <AppText style={[typography.heading, styles.heading]}>
          {"How Are You\nFeeling Now?"}
        </AppText>
        <View style={styles.spacerLarge} />
        <View style={styles.feelingBlock}>
          <Text style={styles.feelingLabel}>
            {MOCK_KRIYA_FEELING_NOW.label}
          </Text>
          <MoodSlider
            valueRatio={MOCK_KRIYA_FEELING_NOW.valueRatio}
            lowLabel="Not Feeling Good"
            highLabel="Feeling Good"
          />
        </View>
        <View style={styles.spacerSmall} />
        <AppButton label="Next" onPress={handleNext} />
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
    paddingHorizontal: spacing.xxl,
    paddingTop: 40,
    paddingBottom: spacing.xxl,
  },
  heading: {
    textAlign: "center",
  },
  spacerLarge: {
    flex: 4,
  },
  spacerSmall: {
    flex: 1,
  },
  feelingBlock: {
    gap: 40,
  },
  feelingLabel: {
    ...typography.moodLabel,
    color: colors.accentGold,
  },
});
