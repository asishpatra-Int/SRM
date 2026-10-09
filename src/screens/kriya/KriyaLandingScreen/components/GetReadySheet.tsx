import {Platform, Pressable, StyleSheet, Text, View} from "react-native";

import {BlurView} from "expo-blur";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {BottomSheet} from "@/core/base/BottomSheet";
import {colors, radii, typography} from "@/core/theme";

const TITLE = "Get Ready";
const MESSAGE =
  "Turn On Airplane Mode to Prevent Any Disruption During the Kriya.";

// A React Native Modal is its own window on Android, so expo-blur cannot
const SHEET_BACKGROUND = Platform.select({
  android: colors.sheetBackgroundAndroid,
  default: colors.sheetBackground,
});

type GetReadySheetProps = {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
};

export function GetReadySheet({visible, onClose, onNext}: GetReadySheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <BlurView
        intensity={40}
        tint="dark"
        style={[
          styles.sheet,
          {
            backgroundColor: SHEET_BACKGROUND,
            paddingBottom: Math.max(insets.bottom, 24) + 19,
          },
        ]}>
        <View style={styles.content}>
          <Text style={[typography.sheetTitle, styles.title]}>{TITLE}</Text>
          <Text style={[typography.sheetMessage, styles.message]}>
            {MESSAGE}
          </Text>
        </View>
        <Pressable
          style={styles.cta}
          onPress={onNext}
          accessibilityRole="button">
          <Text style={[typography.ctaLabel, styles.ctaLabel]}>Next</Text>
        </Pressable>
      </BlurView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    alignItems: "center",
    gap: 57,
    paddingHorizontal: 30,
    paddingTop: 43,
    borderTopLeftRadius: radii.sheetTop,
    borderTopRightRadius: radii.sheetTop,
    overflow: "hidden",
  },
  content: {
    alignItems: "center",
    gap: 12,
  },
  // Figma: #FAF9FF. typography entries carry metrics only, so colour has to be
  // merged in at the call site — this was the missing piece.
  title: {
    color: colors.textPrimary,
  },
  message: {
    color: colors.textOnDark,
    maxWidth: 270,
  },
  cta: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.ctaPill,
    backgroundColor: colors.accentGold,
  },
  ctaLabel: {
    color: colors.ctaTextDark,
  },
});
