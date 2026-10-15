import {Platform, Pressable, StyleSheet, View} from "react-native";

import {BlurView} from "expo-blur";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import CloseIcon from "@/assets/svg/CloseIcon.svg";
import {AppButton, AppText} from "@/components";
import {BottomSheet} from "@/core/base/BottomSheet";
import {colors, radii, spacing, typography} from "@/core/theme";

import {FilterChip} from "./FilterChip";

import type {PracticeTopicMock} from "../../mockData";

// A React Native Modal is its own window on Android, so expo-blur cannot
// sample the screen behind it — same fallback as GetReadySheet.
const SHEET_BACKGROUND = Platform.select({
  android: colors.sheetBackgroundAndroid,
  default: colors.sheetBackground,
});

type PracticeTopicFilterSheetProps = {
  visible: boolean;
  topics: PracticeTopicMock[];
  selectedTopicIds: ReadonlySet<string>;
  onToggleTopic: (id: string) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
};

export function PracticeTopicFilterSheet({
  visible,
  topics,
  selectedTopicIds,
  onToggleTopic,
  onApply,
  onReset,
  onClose,
}: PracticeTopicFilterSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <BlurView
        intensity={40}
        tint="dark"
        style={[
          styles.sheet,
          {
            backgroundColor: SHEET_BACKGROUND,
            paddingBottom: Math.max(insets.bottom, spacing.xxl),
          },
        ]}>
        <View style={styles.header}>
          <AppText style={typography.pageHeading}>Practice Topics</AppText>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close filters">
            <CloseIcon width={16} height={16} />
          </Pressable>
        </View>
        <View style={styles.chipGroup}>
          {topics.map(topic => (
            <FilterChip
              key={topic.id}
              label={topic.label}
              selected={selectedTopicIds.has(topic.id)}
              onPress={() => onToggleTopic(topic.id)}
            />
          ))}
        </View>
        <View style={styles.actions}>
          <AppButton label="Apply Filter" onPress={onApply} />
          <Pressable onPress={onReset} accessibilityRole="button">
            <AppText style={[typography.resetFiltersLabel, styles.resetLabel]}>
              Reset Filters
            </AppText>
          </Pressable>
        </View>
      </BlurView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    gap: 28,
    paddingHorizontal: 30,
    paddingTop: spacing.xxl,
    borderTopLeftRadius: radii.sheetTop,
    borderTopRightRadius: radii.sheetTop,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.trackCardBackground,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  actions: {
    gap: spacing.md,
  },
  resetLabel: {
    color: colors.accentGold,
  },
});
