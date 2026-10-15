import {useState} from "react";

import {StyleSheet, Text, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

import {MoodBackground, MoodSlider} from "../components";
import {MOCK_KRIYA_MOOD} from "../mockData";

export function KriyaMoodScreen() {
  // Retained for the lifetime of this screen so "Next" always carries the
  // latest value the user settled on, even though nothing downstream reads
  // it yet (mock data, no backend).
  const [moodValueRatio, setMoodValueRatio] = useState(
    MOCK_KRIYA_MOOD.valueRatio,
  );

  const handleNext = () => {
    router.push("/improve");
  };

  return (
    <View style={styles.root}>
      <MoodBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <AppText style={typography.heading}>
          {"How Was Your\nKriya Today?"}
        </AppText>
        <View style={styles.spacerLarge} />
        <View style={styles.moodBlock}>
          <Text style={styles.moodLabel}>{MOCK_KRIYA_MOOD.label}</Text>
          <MoodSlider
            initialValueRatio={moodValueRatio}
            onValueChange={setMoodValueRatio}
            lowLabel="Poor"
            highLabel="Excellent"
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
  spacerLarge: {
    flex: 4,
  },
  spacerSmall: {
    flex: 1,
  },
  moodBlock: {
    gap: 40,
  },
  moodLabel: {
    ...typography.moodLabel,
    color: colors.accentGold,
  },
});
