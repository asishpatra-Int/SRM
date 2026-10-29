import {Pressable, StyleSheet, Text, View} from "react-native";

import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";

import cardBackground from "@/assets/kriya-card-bg.png";
import ContinueWatchingPlayIcon from "@/assets/svg/kriya/ContinueWatchingPlayIcon.svg";
import {AppButton} from "@/components";
import {colors, radii, spacing, typography} from "@/core/theme";

type SwarajKriyaHeroCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  continueLabel: string;
  applyLabel: string;
  onContinuePress?: () => void;
  onApplyPress: () => void;
};

// Figma 1580:1274: the onboarding card's texture and hues, on a 114.92°
// gradient (start/end converted for the ~354×373 card, stretched so the
// 105.6% stop lands on 1).
export function SwarajKriyaHeroCard({
  eyebrow,
  title,
  body,
  continueLabel,
  applyLabel,
  onContinuePress,
  onApplyPress,
}: SwarajKriyaHeroCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={cardBackground}
        style={[StyleSheet.absoluteFill, styles.texture]}
        contentFit="cover"
      />
      <LinearGradient
        colors={colors.authCardGradient}
        locations={colors.kriyaIntroCardGradientLocations}
        start={{x: -0.112, y: 0.23}}
        end={{x: 1.181, y: 0.802}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.copy}>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
        </View>
        <Text style={styles.body}>{body}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={styles.continueButton}
          onPress={onContinuePress}
          accessibilityRole="button"
          accessibilityLabel={continueLabel}>
          <Text style={styles.continueLabel}>{continueLabel}</Text>
          <ContinueWatchingPlayIcon width={11} height={16} />
        </Pressable>
        <AppButton label={applyLabel} onPress={onApplyPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    gap: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    borderRadius: radii.input,
    borderWidth: 1,
    borderColor: colors.borderPurple,
    overflow: "hidden",
    boxShadow: [
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  texture: {
    opacity: 0.54,
  },
  copy: {
    gap: spacing.xxl,
  },
  titleBlock: {
    gap: spacing.xs,
  },
  eyebrow: {
    ...typography.detailLabel,
    color: colors.kriyaIntroEyebrow,
    textAlign: "center",
  },
  title: {
    ...typography.detailTitle,
    color: colors.textOnDark,
    textAlign: "center",
  },
  body: {
    ...typography.detailBody,
    color: colors.textOnDark,
    textAlign: "center",
  },
  actions: {
    gap: spacing.lg,
  },
  // Figma's glass pill: outlined, translucent, label + play glyph.
  continueButton: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    borderRadius: radii.ctaPill,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glassLight,
  },
  continueLabel: {
    ...typography.ctaLabel,
    color: colors.textOnDark,
  },
});
