import {
  ActivityIndicator,
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
  isDisabled?: boolean;
  isLoading?: boolean;
};

// The gold pill CTA used across the Kriya flow (Get Ready sheet, mood check
// screen) and the auth flow: rounded-53, #EDB666 fill, #250259 label.
export function AppButton({
  label,
  onPress,
  style,
  isDisabled = false,
  isLoading = false,
}: AppButtonProps) {
  const isInactive = isDisabled || isLoading;

  return (
    <Pressable
      style={[styles.button, isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{disabled: isInactive, busy: isLoading}}>
      {isLoading ? (
        <ActivityIndicator color={colors.ctaTextDark} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
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
  disabled: {
    opacity: 0.6,
  },
  label: {
    ...typography.ctaLabel,
    color: colors.ctaTextDark,
  },
});
