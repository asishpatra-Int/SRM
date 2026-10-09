import { Text, type TextProps } from "react-native";

import { colors } from "@/core/theme";

export function AppText({ style, ...props }: TextProps) {
  return <Text style={[{ color: colors.textPrimary }, style]} {...props} />;
}
