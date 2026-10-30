import {Pressable, StyleSheet, Text, View} from "react-native";

import {LinearGradient} from "expo-linear-gradient";

import PlanLeafIcon from "@/assets/svg/profile/PlanLeafIcon.svg";
import SparklesIcon from "@/assets/svg/SparklesIcon.svg";
import {AppText} from "@/components";
import {colors, radii, spacing, typography} from "@/core/theme";
import type {PlanBenefitMock} from "@/screens/profile/mockData";

const BENEFIT_ICONS = {
  leaf: PlanLeafIcon,
  sparkles: SparklesIcon,
} as const;

type SubscriptionPlanCardProps = {
  billingLabel: string;
  title: string;
  priceLabel: string;
  priceNote: string;
  memberLimitLabel: string;
  benefits: PlanBenefitMock[];
  isSelected: boolean;
  onPress: () => void;
};

// Figma 1643:13397. The opaque 131.23° CSS gradient is converted for the
// ~354×324 card and stretched so its 116.27% stop lands on 1; it fully
// covers the design's texture fill, so no image sits underneath.
export function SubscriptionPlanCard({
  billingLabel,
  title,
  priceLabel,
  priceNote,
  memberLimitLabel,
  benefits,
  isSelected,
  onPress,
}: SubscriptionPlanCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{checked: isSelected}}
      accessibilityLabel={`${title}, ${priceLabel}`}>
      <LinearGradient
        colors={colors.subscriptionPlanGradient}
        locations={colors.subscriptionPlanGradientLocations}
        start={{x: -0.01, y: 0.012}}
        end={{x: 1.175, y: 1.147}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.billingChip}>
        <AppText style={styles.billingLabel}>{billingLabel}</AppText>
      </View>
      <AppText style={styles.title}>{title}</AppText>
      <View style={styles.pricing}>
        <Text style={styles.price}>
          {priceLabel} <Text style={styles.priceNote}>{priceNote}</Text>
        </Text>
        <AppText style={styles.memberLimit}>{memberLimitLabel}</AppText>
      </View>
      <View style={styles.benefits}>
        {benefits.map(benefit => {
          const BenefitIcon = BENEFIT_ICONS[benefit.icon];
          return (
            <View key={benefit.id} style={styles.benefitRow}>
              <BenefitIcon width={18} height={18} />
              <AppText style={styles.benefitLabel}>{benefit.label}</AppText>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xxl,
    padding: spacing.xl,
    borderRadius: radii.sheetTop,
    overflow: "hidden",
  },
  billingChip: {
    height: 28,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: radii.md,
    backgroundColor: colors.accentGold,
  },
  billingLabel: {
    ...typography.detailLabel,
    color: colors.pillLabelDark,
  },
  title: {
    ...typography.planTitle,
    color: colors.textOnDark,
  },
  pricing: {
    gap: spacing.sm,
  },
  price: {
    ...typography.planPrice,
    color: colors.textOnDark,
  },
  priceNote: {
    ...typography.detailBody,
    color: colors.exploreTextFaint,
  },
  memberLimit: {
    ...typography.detailLabel,
    color: colors.exploreTextFaint,
  },
  benefits: {
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.sm,
    backgroundColor: colors.trackCardBackground,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  benefitLabel: {
    ...typography.detailBody,
    flex: 1,
    color: colors.exploreTextFaint,
  },
});
