import type {ReactNode} from "react";

import {type StyleProp, StyleSheet, View, type ViewStyle} from "react-native";

import {colors, radii} from "@/core/theme";

type GlassInputSurfaceProps = {
  isFocused?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

// Figma "window glass" input (Login phone field, OTP boxes): 67% white,
// radius 8, 1px white inset highlight, soft 0/40/30 drop shadow.
export function GlassInputSurface({
  isFocused = false,
  style,
  children,
}: GlassInputSurfaceProps) {
  return (
    <View style={[styles.surface, isFocused && styles.focused, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.input,
    borderWidth: 1,
    borderColor: colors.transparent,
    backgroundColor: colors.authInputBackground,
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
  focused: {
    borderColor: colors.authAccent,
  },
});
