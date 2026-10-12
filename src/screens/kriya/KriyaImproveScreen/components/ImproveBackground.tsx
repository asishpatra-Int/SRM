import type {RefObject} from "react";

import {StyleSheet, View} from "react-native";

import {BlurTargetView} from "expo-blur";
import {Image} from "expo-image";

import glowBlobSmall from "@/assets/GlowBlobSmall.png";
import improveBackground from "@/assets/kriya-improve-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

const IMAGE_OPACITY = 0.82;

type ImproveBackgroundProps = {
  /**
   * Exposes this background as the blur source for BlurViews on the screen.
   * On Android expo-blur needs an explicit target; on iOS BlurTargetView is
   * just a plain View.
   */
  blurTargetRef?: RefObject<View | null>;
};

// Same ambient-glow fix as the other Kriya screens: Figma's export of this
// glow is a tiny circle plus an SVG feGaussianBlur filter, which
// react-native-svg cannot render — this PNG has the blur baked into the
// pixels at the filter's native size, re-centred on the small anchor box
// (left: -173, top: 56, size: 265) Figma's export used.
export function ImproveBackground({blurTargetRef}: ImproveBackgroundProps) {
  return (
    <BlurTargetView ref={blurTargetRef} style={styles.base}>
      <GradientImageBackground
        image={improveBackground}
        imageStyle={styles.imageLayer}
        imageOpacity={IMAGE_OPACITY}
        gradientColors={colors.moodGradient}
        gradientLocations={[0.10046, 0.5]}>
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
    left: -173,
    top: 1,
    width: 762,
    height: 1707,
  },
  glowSmall: {
    position: "absolute",
    left: -568,
    top: -339,
    width: 1055,
    height: 1055,
  },
});
