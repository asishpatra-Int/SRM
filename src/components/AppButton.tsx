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
  // "secondary" is the outlined pill for the lesser of two stacked actions.
  variant?: "primary" | "secondary";
};

// The gold pill CTA used across the Kriya flow (Get Ready sheet, mood check
// screen) and the auth flow: rounded-53, #EDB666 fill, #250259 label. The
// secondary variant keeps the same pill and type, outlined in gold.
export function AppButton({
  label,
  onPress,
  style,
  isDisabled = false,
  isLoading = false,
  variant = "primary",
}: AppButtonProps) {
  const isInactive = isDisabled || isLoading;
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      style={[
        styles.button,
        isSecondary && styles.buttonSecondary,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{disabled: isInactive, busy: isLoading}}>
      {isLoading ? (
        <ActivityIndicator
          color={isSecondary ? colors.textOnDark : colors.ctaTextDark}
        />
      ) : (
        <Text style={[styles.label, isSecondary && styles.labelSecondary]}>
          {label}
        </Text>
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
  buttonSecondary: {
    borderWidth: 1,
    borderColor: colors.accentGold,
    backgroundColor: colors.transparent,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    ...typography.ctaLabel,
    color: colors.ctaTextDark,
  },
  labelSecondary: {
    color: colors.textOnDark,
  },
});
