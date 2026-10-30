import {StyleSheet, View} from "react-native";

import {LinearGradient} from "expo-linear-gradient";

import {AppText} from "@/components";
import {colors, radii, spacing, typography} from "@/core/theme";

type ProfileIdentityCardProps = {
  fullName: string;
  initials: string;
  membershipLabel: string;
  detailLabels: string[];
};

const AVATAR_SIZE = 66;

// Figma 1671:1331: initials avatar, name, gold membership badge, and the
// grey program/leader chips (SwaRaj Kriya members only — empty otherwise).
export function ProfileIdentityCard({
  fullName,
  initials,
  membershipLabel,
  detailLabels,
}: ProfileIdentityCardProps) {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={colors.profileAvatarGradient}
        style={styles.avatar}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        <AppText style={styles.initials}>{initials}</AppText>
      </LinearGradient>
      <View style={styles.details}>
        <AppText style={styles.name} accessibilityRole="header">
          {fullName}
        </AppText>
        <View style={styles.badge}>
          <AppText style={styles.badgeLabel}>{membershipLabel}</AppText>
        </View>
        {detailLabels.length > 0 && (
          <View style={styles.chips}>
            {detailLabels.map(label => (
              <View key={label} style={styles.chip}>
                <AppText style={styles.chipLabel}>{label}</AppText>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: spacing.lg,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    ...typography.avatarInitials,
    color: colors.textOnDark,
  },
  details: {
    alignItems: "center",
    gap: spacing.md,
  },
  name: {
    ...typography.pageHeading,
    lineHeight: 32,
    color: colors.borderPurple,
    textAlign: "center",
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.md,
    backgroundColor: colors.accentGold,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
        color: colors.glassHighlight,
        inset: true,
      },
      {offsetX: 0, offsetY: 40, blurRadius: 15, color: colors.shadowColor},
    ],
  },
  badgeLabel: {
    ...typography.detailLabel,
    color: colors.pillLabelDark,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
    borderRadius: 40,
    backgroundColor: colors.exploreBadgeBackground,
  },
  chipLabel: {
    ...typography.detailLabel,
    color: colors.exploreBadgeText,
  },
});
