import type {RefObject} from "react";

import {StyleSheet, type ViewInstance} from "react-native";

import {BlurTargetView} from "expo-blur";
import {Image} from "expo-image";

import glowBlobSmall from "@/assets/GlowBlobSmall.png";
import sessionBackground from "@/assets/kriya-session-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

type SessionBackgroundProps = {
  /**
   * Exposes this background as the blur source for BlurViews on the screen.
   * On Android expo-blur needs an explicit target; on iOS BlurTargetView is
   * just a plain View.
   */
  blurTargetRef?: RefObject<ViewInstance | null>;
};

// Figma exports this ambient glow as a tiny circle plus an SVG feGaussianBlur
// filter — react-native-svg doesn't implement SVG filters, so it drew the
// unblurred circle as a hard-edged dot. This PNG is rendered locally from the
// filter's exact parameters (fill, opacity, blur sigma) with the blur baked
// into the pixels, at the filter's native canvas size, then re-centred on the
// small anchor box Figma's export used (left: -173, top: 56, size: 265).
export function SessionBackground({blurTargetRef}: SessionBackgroundProps) {
  return (
    <BlurTargetView ref={blurTargetRef} style={styles.base}>
      <GradientImageBackground
        image={sessionBackground}
        imageStyle={styles.imageLayer}
        gradientColors={colors.sessionGradient}
        gradientLocations={[0.0733, 0.1393, 0.2077, 0.3154, 0.6006, 1]}>
        <Image source={glowBlobSmall} style={styles.glowSmall} />
      </GradientImageBackground>
    </BlurTargetView>
  );
}

const styles = StyleSheet.create({
  base: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.sessionBackgroundBase,
  },
  imageLayer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.68,
  },
  glowSmall: {
    position: "absolute",
    left: -568,
    top: -339,
    width: 1055,
    height: 1055,
  },
});
