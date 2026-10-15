import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import glowBlobLarge from "@/assets/GlowBlobLarge.png";
import glowBlobSmall from "@/assets/GlowBlobSmall.png";
import heroBackground from "@/assets/kriya-hero-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// Same hero image, overlay and ambient glows as the Kriya landing screen's
// GlowBackground — the Practice screen reuses this exact background in the
// design. Kept local (not shared) to match this codebase's existing
// convention of one background component per screen folder.
export function PracticeBackground() {
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
  glowSmall: {
    position: "absolute",
    left: -568,
    top: -339,
    width: 1055,
    height: 1055,
  },
  glowLarge: {
    position: "absolute",
    left: -315,
    top: 564,
    width: 619,
    height: 619,
  },
});
