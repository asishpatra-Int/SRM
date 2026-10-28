import {useEffect, useRef, useState} from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {router, useLocalSearchParams} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {AppButton} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import {useAuthStore} from "@/store";

import {AuthBackground, AuthFormHeader} from "../components";
import {
  MOCK_COUNTRY_DIAL_CODE,
  MOCK_REQUEST_DELAY_MS,
  OTP_LENGTH,
  OTP_RESEND_SECONDS,
} from "../mockData";

import {
  OtpCodeInput,
  type OtpCodeInputHandle,
  ResendOtpPrompt,
} from "./components";

export function OtpVerificationScreen() {
  const {mobileNumber} = useLocalSearchParams<{mobileNumber?: string}>();
  const logIn = useAuthStore(s => s.logIn);
  const [otpCode, setOtpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);
  const otpInputRef = useRef<OtpCodeInputHandle>(null);
  const pendingRequestRef = useRef<ReturnType<
    typeof globalThis.setTimeout
  > | null>(null);

  // Resend countdown; restarts whenever secondsLeft is reset.
  const isCountingDown = secondsLeft > 0;
  useEffect(() => {
    if (!isCountingDown) {
      return;
    }
    const interval = globalThis.setInterval(() => {
      setSecondsLeft(current => Math.max(current - 1, 0));
    }, 1000);
    return () => globalThis.clearInterval(interval);
  }, [isCountingDown]);

  useEffect(
    () => () => {
      if (pendingRequestRef.current) {
        globalThis.clearTimeout(pendingRequestRef.current);
      }
    },
    [],
  );

  const handleOtpChange = (value: string) => {
    setOtpCode(value);
    setErrorMessage(null);
  };

  // Mock verification: no server, so any complete code succeeds. Signing in
  // flips the root layout's auth guard, which swaps the auth stack for the
  // existing home tabs (and drops this stack from history).
  const handleVerify = () => {
    if (isVerifying) {
      return;
    }
    if (otpCode.length !== OTP_LENGTH) {
      setErrorMessage(`Enter the ${OTP_LENGTH}-digit code`);
      return;
    }
    Keyboard.dismiss();
    setIsVerifying(true);
    pendingRequestRef.current = globalThis.setTimeout(() => {
      pendingRequestRef.current = null;
      logIn();
    }, MOCK_REQUEST_DELAY_MS);
  };

  // Mock resend: nothing is sent; just clear the code and restart the timer.
  const handleResend = () => {
    setOtpCode("");
    setErrorMessage(null);
    setSecondsLeft(OTP_RESEND_SECONDS);
    otpInputRef.current?.focus();
  };

  const handleChangeNumber = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <AuthBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.safeArea}
          behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <AuthFormHeader title="Enter OTP" />
            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <OtpCodeInput
                  ref={otpInputRef}
                  value={otpCode}
                  length={OTP_LENGTH}
                  accessibilityHint={
                    mobileNumber
                      ? `Sent to ${MOCK_COUNTRY_DIAL_CODE} ${mobileNumber}`
                      : undefined
                  }
                  onChangeText={handleOtpChange}
                  onComplete={Keyboard.dismiss}
                />
                {errorMessage ? (
                  <Text style={styles.error} accessibilityRole="alert">
                    {errorMessage}
                  </Text>
                ) : null}
              </View>
              <AppButton
                label="Verify OTP"
                onPress={handleVerify}
                isLoading={isVerifying}
              />
            </View>
            <View style={styles.footer}>
              <ResendOtpPrompt
                secondsLeft={secondsLeft}
                onResendPress={handleResend}
                onChangeNumberPress={handleChangeNumber}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.authBackground,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxl,
  },
  // Figma: heading → 12 → OTP boxes → 16 → Verify → 24 → resend/change.
  form: {
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  error: {
    ...typography.detailBody,
    color: colors.authErrorText,
    textAlign: "center",
  },
  footer: {
    marginTop: spacing.xxl,
  },
});
