import {useRef, useState} from "react";

import {StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {spacing, typography} from "@/core/theme";

import {MOCK_IMPROVEMENT_OPTIONS} from "../mockData";

import {
  ImproveBackground,
  ImprovementChip,
  NoteInput,
  ShareCheckbox,
} from "./components";

function handleNext() {
  router.push("/feeling");
}

export function KriyaImproveScreen() {
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [note, setNote] = useState("");
  const [shareWithTeam, setShareWithTeam] = useState(true);
  const blurTargetRef = useRef<View>(null);

  const toggleOption = (id: string) => {
    setSelectedIds(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <View style={styles.root}>
      <ImproveBackground blurTargetRef={blurTargetRef} />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <AppText style={[typography.heading, styles.heading]}>
          {"Where can\nI improve?"}
        </AppText>
        <View style={styles.chipGroup}>
          {MOCK_IMPROVEMENT_OPTIONS.map(option => (
            <ImprovementChip
              key={option.id}
              label={option.label}
              selected={selectedIds.has(option.id)}
              onPress={() => toggleOption(option.id)}
              blurTarget={blurTargetRef}
            />
          ))}
        </View>
        <View style={styles.spacer} />
        <View style={styles.bottomBlock}>
          <NoteInput
            value={note}
            onChangeText={setNote}
            blurTarget={blurTargetRef}
          />
          <ShareCheckbox
            label="Share with SRM Team"
            checked={shareWithTeam}
            onToggle={() => setShareWithTeam(current => !current)}
          />
          <AppButton label="Next" onPress={handleNext} />
        </View>
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
    maxWidth: 254,
    alignSelf: "center",
  },
  chipGroup: {
    marginTop: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.md,
  },
  spacer: {
    flex: 1,
  },
  bottomBlock: {
    width: "100%",
    gap: 17,
  },
});
