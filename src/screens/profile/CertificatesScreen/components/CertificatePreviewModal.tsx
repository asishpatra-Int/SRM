import {Modal, Pressable, StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import CloseIcon from "@/assets/svg/CloseIcon.svg";
import {colors, spacing} from "@/core/theme";

type CertificatePreviewModalProps = {
  // The certificate artwork to show; null keeps the preview closed.
  image: number | null;
  title: string;
  onClose: () => void;
};

// Figma 1640:12255: the certificate on a grey card, with a glass close
// button above its top-right corner, over a dimmed screen.
export function CertificatePreviewModal({
  image,
  title,
  onClose,
}: CertificatePreviewModalProps) {
  return (
    <Modal
      visible={image !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.scrim}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        />
        <View style={styles.content}>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close certificate"
            hitSlop={8}>
            <CloseIcon width={16} height={16} />
          </Pressable>
          <View style={styles.card} accessibilityLabel={title}>
            <View style={styles.imageFrame}>
              {image !== null && (
                <Image source={image} style={styles.image} contentFit="fill" />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const CLOSE_BUTTON_SIZE = 32;

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.sheetScrim,
  },
  // Figma: a 372-wide column on the 402 frame — 15 each side.
  content: {
    alignItems: "flex-end",
    gap: 18,
    paddingHorizontal: 15,
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.certificatePreviewCloseBackground,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 1,
        color: colors.glassHighlight,
        inset: true,
      },
      {offsetX: 0, offsetY: 40, blurRadius: 30, color: colors.shadowColor},
    ],
  },
  card: {
    width: "100%",
    padding: spacing.xl,
    borderRadius: 8,
    backgroundColor: colors.certificatePreviewBackground,
    boxShadow: [
      {offsetX: 0, offsetY: 0, blurRadius: 4, color: colors.popoverShadow},
    ],
  },
  // Figma: 332×214 inside the card's 20pt padding.
  imageFrame: {
    width: "100%",
    aspectRatio: 332 / 214,
    borderRadius: 8,
    overflow: "hidden",
  },
  // Crop: w 112.1%, h 108.01%, left -6.05%, top -4.01%.
  image: {
    position: "absolute",
    left: "-6.05%",
    top: "-4.01%",
    width: "112.1%",
    height: "108.01%",
  },
});
