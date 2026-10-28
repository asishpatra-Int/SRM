import {StyleSheet, Text, View} from "react-native";

import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";

import cardBackground from "@/assets/kriya-card-bg.png";
import {AppButton} from "@/components";
import {colors, radii, typography} from "@/core/theme";

type OnboardingCardProps = {
  title: string;
  body: string;
  ctaLabel: string;
  onCtaPress: () => void;
};

// Figma 1580:852. The texture is the same image as the Kriya practice card;
// the gradient is Figma's 116.66° linear gradient converted to start/end
// points for a 354×456 card, stretched so its 122% stop lands on 1.
export function OnboardingCard({
  title,
  body,
  ctaLabel,
  onCtaPress,
}: OnboardingCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={cardBackground}
        style={[StyleSheet.absoluteFill, styles.texture]}
        contentFit="cover"
      />
      <LinearGradient
        colors={colors.authCardGradient}
        locations={colors.authCardGradientLocations}
        start={{x: -0.158, y: 0.244}}
        end={{x: 1.449, y: 0.869}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.copy}>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <AppButton label={ctaLabel} onPress={onCtaPress} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 456,
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
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
    alignItems: "center",
    gap: 16,
  },
  title: {
    ...typography.detailTitle,
    color: colors.textOnDark,
    textAlign: "center",
  },
  body: {
    ...typography.onboardingBody,
    color: colors.textOnDark,
    maxWidth: 312,
  },
  cta: {
    alignSelf: "stretch",
  },
});
