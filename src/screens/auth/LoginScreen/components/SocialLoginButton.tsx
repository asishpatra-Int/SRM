import {Pressable, StyleSheet, Text, View} from "react-native";

import {Image, type ImageSource} from "expo-image";

import {colors, radii, typography} from "@/core/theme";

type SocialLoginButtonProps = {
  label: string;
  icon: ImageSource | number;
  // The logos are cropped out of larger screenshots in Figma; each caller
  // passes the crop that places its logo inside the 20×20 slot.
  iconCropStyle: {left: number; top: number; width: number; height: number};
  isDisabled?: boolean;
  onPress: () => void;
};

// Figma "Google Button" / "Apple Button": white pill, 20pt logo + label.
export function SocialLoginButton({
  label,
  icon,
  iconCropStyle,
  isDisabled = false,
  onPress,
}: SocialLoginButtonProps) {
  return (
    <Pressable
      style={[styles.button, isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{disabled: isDisabled}}>
      <View style={styles.iconSlot}>
        <Image
          source={icon}
          style={[styles.icon, iconCropStyle]}
          contentFit="fill"
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: radii.ctaPill,
    backgroundColor: colors.authSocialButtonBackground,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
        color: colors.glassHighlight,
        inset: true,
      },
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  disabled: {
    opacity: 0.6,
  },
  iconSlot: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
  },
  label: {
    ...typography.inputText,
    color: colors.authTextDark,
  },
});
