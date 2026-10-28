import {Pressable, StyleSheet, Text, View} from "react-native";

import {colors, typography} from "@/core/theme";

type ResendOtpPromptProps = {
  secondsLeft: number;
  onResendPress: () => void;
  onChangeNumberPress: () => void;
};

// Figma 1580:1064: resend countdown + "Change Number" link. Once the
// countdown reaches zero the countdown turns into a "Resend OTP" link.
export function ResendOtpPrompt({
  secondsLeft,
  onResendPress,
  onChangeNumberPress,
}: ResendOtpPromptProps) {
  const canResend = secondsLeft <= 0;

  return (
    <View style={styles.root}>
      <View style={styles.resendRow}>
        <Text style={styles.prompt}>
          Did Not Receive Code?{" "}
          {canResend ? "" : `Resend After ${secondsLeft}s`}
        </Text>
        {canResend ? (
          <Pressable
            onPress={onResendPress}
            hitSlop={8}
            accessibilityRole="button">
            <Text style={styles.link}>Resend OTP</Text>
          </Pressable>
        ) : null}
      </View>
      <Pressable
        onPress={onChangeNumberPress}
        hitSlop={8}
        accessibilityRole="button">
        <Text style={styles.link}>Change Number</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 16,
  },
  resendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  prompt: {
    ...typography.detailBody,
    color: colors.authTextDark,
    textAlign: "center",
  },
  link: {
    ...typography.detailBody,
    color: colors.authAccent,
    textDecorationLine: "underline",
  },
});
