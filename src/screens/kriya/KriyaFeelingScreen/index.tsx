import {useState} from "react";

import {StyleSheet, Text, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {MoodBackground, MoodSlider} from "../components";
import {MOCK_KRIYA_FEELING_NOW} from "../mockData";

export function KriyaFeelingScreen() {
  // Retained for the lifetime of this screen so "Next" always carries the
  // latest value the user settled on, even though nothing downstream reads
  // it yet (mock data, no backend).
  const [feelingValueRatio, setFeelingValueRatio] = useState(
    MOCK_KRIYA_FEELING_NOW.valueRatio,
  );

  // Ends the Kriya flow (Get Ready -> Session -> Mood -> Improve -> Feeling)
  // and returns home.
  const handleNext = () => {
    router.dismissAll();
  };

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
            initialValueRatio={feelingValueRatio}
            onValueChange={setFeelingValueRatio}
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
