import {useState} from "react";

import {StyleSheet, Text, TextInput, View} from "react-native";

import CountryCodeChevron from "@/assets/svg/CountryCodeChevron.svg";
import IndiaFlagBackground from "@/assets/svg/IndiaFlagBackground.svg";
import IndiaFlagEmblem from "@/assets/svg/IndiaFlagEmblem.svg";
import {colors, typography} from "@/core/theme";

import {GlassInputSurface} from "../../components";

type MobileNumberFieldProps = {
  dialCode: string;
  value: string;
  maxLength: number;
  placeholder: string;
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
};

// Figma "Input Field" 1580:926: flag + dial code + chevron, then the number.
// The flag is Figma's two layers stacked (its mask is a full-size rect, so
// it clips nothing).
export function MobileNumberField({
  dialCode,
  value,
  maxLength,
  placeholder,
  onChangeText,
  onSubmitEditing,
}: MobileNumberFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <GlassInputSurface isFocused={isFocused} style={styles.surface}>
      <View style={styles.countryCode} accessible accessibilityLabel={dialCode}>
        <View style={styles.flag}>
          <IndiaFlagBackground
            width={26}
            height={19.5}
            style={StyleSheet.absoluteFill}
          />
          <IndiaFlagEmblem
            width={26}
            height={19.5}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Text style={styles.dialCode}>{dialCode}</Text>
        <View style={styles.chevron}>
          <CountryCodeChevron width={5.44853} height={9.2} />
        </View>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.authTextMuted}
        keyboardType="number-pad"
        textContentType="telephoneNumber"
        autoComplete="tel"
        returnKeyType="done"
        maxLength={maxLength}
        accessibilityLabel="Mobile number"
      />
    </GlassInputSurface>
  );
}

const styles = StyleSheet.create({
  surface: {
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flag: {
    width: 26,
    height: 19.5,
  },
  dialCode: {
    ...typography.inputText,
    color: colors.authTextMuted,
  },
  // Figma draws a left chevron rotated -90° into an 8×4 slot.
  chevron: {
    width: 8,
    height: 8,
    alignItems: "center",
    justifyContent: "center",
    transform: [{rotate: "-90deg"}],
  },
  input: {
    ...typography.inputText,
    flex: 1,
    color: colors.authTextDark,
    // Android's TextInput adds its own vertical padding and font padding;
    // the surface owns the 16pt Figma padding instead.
    paddingVertical: 0,
    includeFontPadding: false,
  },
});
