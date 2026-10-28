import {type Ref, useImperativeHandle, useRef, useState} from "react";

import {Pressable, StyleSheet, Text, TextInput} from "react-native";

import {colors, typography} from "@/core/theme";

import {GlassInputSurface} from "../../components";

export type OtpCodeInputHandle = {
  focus: () => void;
};

type OtpCodeInputProps = {
  ref?: Ref<OtpCodeInputHandle>;
  value: string;
  length: number;
  accessibilityHint?: string;
  onChangeText: (value: string) => void;
  onComplete: () => void;
};

// Figma "OTP Input Group" 1580:1045: five glass boxes. One hidden TextInput
// owns the value, so paste, SMS autofill and backspace behave natively; the
// boxes only render it and forward taps to that input.
export function OtpCodeInput({
  ref,
  value,
  length,
  accessibilityHint,
  onChangeText,
  onComplete,
}: OtpCodeInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, length);
    onChangeText(digits);
    if (digits.length === length) {
      onComplete();
    }
  };

  const activeIndex = Math.min(value.length, length - 1);

  return (
    <Pressable
      style={styles.row}
      onPress={() => inputRef.current?.focus()}
      accessible={false}>
      {Array.from({length}, (_, index) => (
        <GlassInputSurface
          key={index}
          isFocused={isFocused && index === activeIndex}
          style={styles.box}>
          <Text style={styles.digit}>{value[index] ?? ""}</Text>
        </GlassInputSurface>
      ))}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={length}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        caretHidden
        autoFocus
        accessibilityLabel={`${length}-digit verification code`}
        accessibilityHint={accessibilityHint}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 16,
    minHeight: 54,
  },
  digit: {
    ...typography.inputText,
    color: colors.authTextDark,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
