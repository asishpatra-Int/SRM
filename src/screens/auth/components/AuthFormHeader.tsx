import {StyleSheet, Text, View} from "react-native";

import SrmHeaderLogo from "@/assets/svg/SrmHeaderLogo.svg";
import {colors, typography} from "@/core/theme";

type AuthFormHeaderProps = {
  title: string;
};

// SRM logo + purple form title shared by the Login and OTP screens
// (Figma: logo, 48 gap, "Enter …" heading).
export function AuthFormHeader({title}: AuthFormHeaderProps) {
  return (
    <View style={styles.root}>
      <SrmHeaderLogo width={93} height={31} />
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  title: {
    ...typography.pageHeading,
    color: colors.authAccent,
    textAlign: "center",
    marginTop: 48,
  },
});
