import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native";

import {colors, radii, typography} from "@/core/theme";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

// The gold pill CTA used across the Kriya flow (Get Ready sheet, mood check
// screen): rounded-53, #EDB666 fill, #250259 label.
export function AppButton({label, onPress, style}: AppButtonProps) {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      accessibilityRole="button">
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.ctaPill,
    backgroundColor: colors.accentGold,
  },
  label: {
    ...typography.ctaLabel,
    color: colors.ctaTextDark,
  },
});
