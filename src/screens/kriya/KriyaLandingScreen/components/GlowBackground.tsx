import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import glowBlobLarge from "@/assets/GlowBlobLarge.png";
import glowBlobSmall from "@/assets/GlowBlobSmall.png";
import heroBackground from "@/assets/kriya-hero-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// Figma exports these ambient glows as a tiny circle plus an SVG
// feGaussianBlur filter — react-native-svg doesn't implement SVG filters, so
// it would draw the unblurred circle as a hard-edged dot. These are rendered
// locally from the filter's exact parameters (fill, opacity, blur sigma) as
// PNGs with the blur baked into the pixels, at the filter's native canvas
// size, then re-centred on the small anchor box Figma's export used.
export function GlowBackground() {
  return (
    <GradientImageBackground
      image={heroBackground}
      imageStyle={styles.heroLayer}
      gradientColors={colors.heroGradient}
      gradientLocations={[0.105, 0.333, 0.511, 0.646]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: colors.backgroundOverlay},
        ]}
      />
      <Image source={glowBlobSmall} style={styles.glowSmall} />
      <Image source={glowBlobLarge} style={styles.glowLarge} />
    </GradientImageBackground>
  );
}

const styles = StyleSheet.create({
  heroLayer: {
    position: "absolute",
    left: -164,
    top: -342,
    width: 999,
    height: 1944,
  },
  // anchor box 265 @ (-173, 56); native size 1055x1055
  glowSmall: {
    position: "absolute",
    left: -568,
    top: -339,
    width: 1055,
    height: 1055,
  },
  // anchor box 363 @ (-187, 692); native size 619x619
  glowLarge: {
    position: "absolute",
    left: -315,
    top: 564,
    width: 619,
    height: 619,
  },
});
