import {useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";

import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import {useProfileQuery} from "@/query";
import {ExploreBackground} from "@/screens/explore/components";

import {ProfileSubpageHeader} from "../components";
import {MOCK_SUBSCRIPTION_PLANS} from "../mockData";

import {SubscriptionPlanCard} from "./components";

const PAYMENT_FAILED_MESSAGE = "Payment could not be completed. Please retry.";

// Subscription (Figma 1643:13304). Pay Now runs the mock purchase — no
// payment gateway is integrated — and lands on Payment Done.
export function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const {callPurchaseSubscription, isPurchaseSubscriptionLoading: isPaying} =
    useProfileQuery();
  const [selectedPlanId, setSelectedPlanId] = useState(
    MOCK_SUBSCRIPTION_PLANS[0].id,
  );
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const handlePayNow = async () => {
    if (isPaying) {
      return;
    }
    setPaymentError(null);
    const response = await callPurchaseSubscription({planId: selectedPlanId});
    if (!response.isSuccess) {
      setPaymentError(PAYMENT_FAILED_MESSAGE);
      return;
    }
    // Replace, so back from Payment Done skips the paid-for plan screen.
    router.replace("/payment-success");
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <ProfileSubpageHeader title="Subscription" onBackPress={handleBack} />
          <View style={styles.plans} accessibilityRole="radiogroup">
            {MOCK_SUBSCRIPTION_PLANS.map(plan => (
              <SubscriptionPlanCard
                key={plan.id}
                billingLabel={plan.billingLabel}
                title={plan.title}
                priceLabel={plan.priceLabel}
                priceNote={plan.priceNote}
                memberLimitLabel={plan.memberLimitLabel}
                benefits={plan.benefits}
                isSelected={plan.id === selectedPlanId}
                onPress={() => setSelectedPlanId(plan.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            {paddingBottom: Math.max(insets.bottom, spacing.lg)},
          ]}>
          {paymentError && (
            <AppText style={styles.error} accessibilityRole="alert">
              {paymentError}
            </AppText>
          )}
          <View style={styles.actions}>
            {/* No offline-payment flow is designed yet, so this is inert. */}
            <AppButton
              label="I Want to Pay Offline"
              variant="light"
              onPress={() => undefined}
              isDisabled={isPaying}
            />
            <AppButton
              label="Pay Now"
              onPress={handlePayNow}
              isLoading={isPaying}
            />
          </View>
          {/* No payment-help destination is designed yet. */}
          <AppText style={styles.helpLink}>Need Help with Payment?</AppText>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  // Figma: header → 32 → plan card, all on a 24pt inset.
  content: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    gap: spacing.xxxl,
  },
  plans: {
    gap: spacing.lg,
  },
  // Pinned footer (Figma 1643:13420): 12 above, 24 sides, 16 below.
  footer: {
    gap: spacing.md,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  actions: {
    gap: 10,
  },
  error: {
    ...typography.detailBody,
    color: colors.authErrorText,
    textAlign: "center",
  },
  helpLink: {
    ...typography.detailBody,
    color: colors.borderPurple,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
