import type {RefObject} from "react";

import {StyleSheet, Text, TextInput, type ViewInstance} from "react-native";

import {BlurView} from "expo-blur";

import {colors, radii, spacing, typography} from "@/core/theme";

type NoteInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  /**
   * The background this box blurs. Required on Android: without it,
   * `blurMethod` silently falls back to "none" and no blur is drawn.
   */
  blurTarget?: RefObject<ViewInstance | null>;
};

// "Note:" is a persistent label, not the TextInput's placeholder — a
// placeholder disappears the moment the user starts typing (and reads as
// faded even at full color, next to the solid-white labels elsewhere on this
// screen), neither of which is what a section label should do.
export function NoteInput({value, onChangeText, blurTarget}: NoteInputProps) {
  return (
    <BlurView
      intensity={50}
      tint="light"
      blurMethod="dimezisBlurView"
      blurTarget={blurTarget}
      style={styles.box}>
      <Text style={styles.label}>Note:</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        style={styles.input}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 195,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: radii.sheetTop,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.noteInputBackground,
    overflow: "hidden",
    gap: spacing.xs,
  },
  label: {
    ...typography.noteLabel,
    color: colors.textPrimary,
  },
  input: {
    flex: 1,
    ...typography.noteLabel,
    color: colors.textPrimary,
  },
});
