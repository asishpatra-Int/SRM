import {
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";

import {Image} from "expo-image";

import CertificateDownloadIcon from "@/assets/svg/profile/CertificateDownloadIcon.svg";
import CertificateViewIcon from "@/assets/svg/profile/CertificateViewIcon.svg";
import {AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";

type CertificateCardProps = {
  title: string;
  issuedOnLabel: string;
  image: number;
  onPress: () => void;
  // The Certificates screen's cards carry download/view buttons (Figma
  // 1643:13145); the Profile preview row's cards do not (1671:1714).
  showActions?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function CertificateCard({
  title,
  issuedOnLabel,
  image,
  onPress,
  showActions = false,
  style,
}: CertificateCardProps) {
  return (
    <Pressable
      style={[styles.card, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, issued ${issuedOnLabel}`}>
      <View style={styles.imageFrame}>
        <Image
          source={image}
          style={StyleSheet.absoluteFill}
          contentFit="contain"
        />
        {showActions && (
          <>
            <View style={styles.imageOverlay} />
            {/* Download has no backend yet, so it is shown but inert; the
                view button opens the preview, as the whole card does. */}
            <View style={styles.actions}>
              <View style={styles.actionButton}>
                <CertificateDownloadIcon width={9.14589} height={9.4317} />
              </View>
              <Pressable
                style={styles.actionButton}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={`View ${title}`}>
                <CertificateViewIcon width={14.4691} height={11.0625} />
              </Pressable>
            </View>
          </>
        )}
      </View>
      <View style={styles.copy}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.date}>{issuedOnLabel}</AppText>
      </View>
    </Pressable>
  );
}

const ACTION_BUTTON_SIZE = 25;

const styles = StyleSheet.create({
  card: {
    width: 171,
    gap: spacing.md,
  },
  // Figma: 171×103, image fill object-contain.
  imageFrame: {
    width: "100%",
    aspectRatio: 171 / 103,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.certificateImageOverlay,
  },
  actions: {
    position: "absolute",
    top: 6,
    right: 6,
    gap: spacing.xs,
  },
  actionButton: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.certificateActionBackground,
    boxShadow: [
      {offsetX: 0, offsetY: 22.7, blurRadius: 17, color: colors.shadowColor},
    ],
  },
  copy: {
    gap: spacing.xs,
  },
  title: {
    ...typography.bodyHeading,
    color: colors.pillLabelDark,
  },
  date: {
    ...typography.detailBody,
    color: colors.exploreTextMuted,
  },
});
