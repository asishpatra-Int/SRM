import {type ReactNode, useState} from "react";

import {
  type KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  type TextInputProps,
} from "react-native";

import {AppGlassInputSurface} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

type FormTextInputProps = {
  value: string;
  placeholder: string;
  accessibilityLabel: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  textContentType?: TextInputProps["textContentType"];
  // Multi-line answer box (Figma 1580:2298, 148pt tall).
  isMultiline?: boolean;
  trailingIcon?: ReactNode;
};

// Figma "Input Field": the shared window-glass surface with a 16pt inset.
export function FormTextInput({
  value,
  placeholder,
  accessibilityLabel,
  onChangeText,
  keyboardType,
  maxLength,
  autoCapitalize,
  textContentType,
  isMultiline = false,
  trailingIcon,
}: FormTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <AppGlassInputSurface
      isFocused={isFocused}
      style={[styles.surface, isMultiline && styles.surfaceMultiline]}>
      <TextInput
        style={[styles.input, isMultiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.authTextMuted}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        textContentType={textContentType}
        multiline={isMultiline}
        textAlignVertical={isMultiline ? "top" : "center"}
        accessibilityLabel={accessibilityLabel}
      />
      {trailingIcon}
    </AppGlassInputSurface>
  );
}

const styles = StyleSheet.create({
  surface: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  surfaceMultiline: {
    height: 148,
    alignItems: "flex-start",
  },
  input: {
    ...typography.inputText,
    flex: 1,
    color: colors.authTextDark,
    // The surface owns the 16pt Figma padding (see AppMobileNumberField).
    paddingVertical: 0,
    includeFontPadding: false,
  },
  inputMultiline: {
    alignSelf: "stretch",
  },
});
