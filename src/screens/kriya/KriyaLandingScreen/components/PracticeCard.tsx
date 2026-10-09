import {Pressable, StyleSheet, Text, View} from "react-native";

import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";

import cardBackground from "@/assets/kriya-card-bg.png";
import PlaySymbol from "@/assets/svg/PlaySymbol.svg";
import {colors, radii, spacing, typography} from "@/core/theme";

type PracticeCardProps = {
  title: string;
  subtitle?: string;
  durationLabel: string;
  onPress?: () => void;
};

export function PracticeCard({
  title,
  subtitle,
  durationLabel,
  onPress,
}: PracticeCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={cardBackground}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={colors.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.footer}>
          <Text style={styles.duration}>{durationLabel}</Text>
          <PlaySymbol width={24} height={24} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 175,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.borderPurple,
    padding: spacing.xl,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    ...typography.cardTitle,
    color: colors.textOnDark,
  },
  subtitle: {
    ...typography.cardSubtitle,
    color: colors.textOnDark,
    marginTop: spacing.xs - 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  duration: {
    ...typography.durationLabel,
    color: colors.textOnDark,
  },
});
