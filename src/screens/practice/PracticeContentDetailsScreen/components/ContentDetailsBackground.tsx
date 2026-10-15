import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import glowBlobLarge from "@/assets/GlowBlobLarge.png";
import heroBackground from "@/assets/kriya-hero-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// Same hero image and overlay as PracticeBackground/GlowBackground, but this
// frame only shows the single large ambient glow (no small one).
export function ContentDetailsBackground() {
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
  // anchor box 363 @ (-187, 692); native size 619x619
  glowLarge: {
    position: "absolute",
    left: -315,
    top: 564,
    width: 619,
    height: 619,
  },
});
