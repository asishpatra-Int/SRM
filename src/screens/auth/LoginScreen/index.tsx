import {useEffect, useRef, useState} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import appleLogo from "@/assets/auth-apple-logo.png";
import googleLogo from "@/assets/auth-google-logo.png";
import {AppButton} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import {useAuthStore} from "@/store";

import {AuthBackground, AuthFormHeader} from "../components";
import {
  MOBILE_NUMBER_LENGTH,
  MOCK_COUNTRY_DIAL_CODE,
  MOCK_REQUEST_DELAY_MS,
} from "../mockData";

import {MobileNumberField, OrDivider, SocialLoginButton} from "./components";

// Figma crops of the two logo screenshots into the 20×20 icon slot.
const GOOGLE_ICON_CROP = {left: -0.54, top: -0.21, width: 21.22, height: 20.13};
const APPLE_ICON_CROP = {left: -3.94, top: -4.32, width: 28.4, height: 30.3};

export function LoginScreen() {
  const logIn = useAuthStore(s => s.logIn);
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const pendingRequestRef = useRef<ReturnType<
    typeof globalThis.setTimeout
  > | null>(null);

  useEffect(
    () => () => {
      if (pendingRequestRef.current) {
        globalThis.clearTimeout(pendingRequestRef.current);
      }
    },
    [],
  );

  const handleMobileNumberChange = (value: string) => {
    setMobileNumber(value.replace(/\D/g, ""));
    setErrorMessage(null);
  };

  // Mock "Send OTP": validate locally, fake a round-trip, then move on.
  const handleSendOtp = () => {
    if (isSendingOtp) {
      return;
    }
    if (mobileNumber.length !== MOBILE_NUMBER_LENGTH) {
      setErrorMessage(
        `Enter a valid ${MOBILE_NUMBER_LENGTH}-digit mobile number`,
      );
      return;
    }
    setIsSendingOtp(true);
    pendingRequestRef.current = globalThis.setTimeout(() => {
      pendingRequestRef.current = null;
      setIsSendingOtp(false);
      router.push({
        pathname: "/otp-verification",
        params: {mobileNumber},
      });
    }, MOCK_REQUEST_DELAY_MS);
  };

  // Mock social sign-in: no provider SDK yet, so it signs straight in. The
  // root layout's auth guard then swaps the auth stack for the home tabs.
  const handleSocialSignIn = () => {
    if (!isSendingOtp) {
      logIn();
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
            <AuthFormHeader title="Enter Mobile Number" />
            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <MobileNumberField
                  dialCode={MOCK_COUNTRY_DIAL_CODE}
                  value={mobileNumber}
                  maxLength={MOBILE_NUMBER_LENGTH}
                  placeholder="9876543210"
                  onChangeText={handleMobileNumberChange}
                  onSubmitEditing={handleSendOtp}
                />
                {errorMessage ? (
                  <Text style={styles.error} accessibilityRole="alert">
                    {errorMessage}
                  </Text>
                ) : null}
              </View>
              <AppButton
                label="Send OTP"
                onPress={handleSendOtp}
                isLoading={isSendingOtp}
              />
            </View>
            <View style={styles.alternatives}>
              <OrDivider />
              <View style={styles.socialButtons}>
                <SocialLoginButton
                  label="Sign in with Google"
                  icon={googleLogo}
                  iconCropStyle={GOOGLE_ICON_CROP}
                  isDisabled={isSendingOtp}
                  onPress={handleSocialSignIn}
                />
                <SocialLoginButton
                  label="Sign in with Apple"
                  icon={appleLogo}
                  iconCropStyle={APPLE_ICON_CROP}
                  isDisabled={isSendingOtp}
                  onPress={handleSocialSignIn}
                />
              </View>
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
  // Figma: heading → 12 → input → 16 → Send OTP → 24 → divider → 24 → social.
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
  alternatives: {
    marginTop: spacing.xxl,
    gap: spacing.xxl,
  },
  socialButtons: {
    gap: spacing.md,
  },
});
