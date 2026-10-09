import {StyleSheet, View} from "react-native";

import heroBackground from "@/assets/kriya-hero-bg.png";
import GlowBlobLarge from "@/assets/svg/GlowBlobLarge.svg";
import GlowBlobSmall from "@/assets/svg/GlowBlobSmall.svg";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

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
      <View style={styles.glowSmall}>
        <GlowBlobSmall width={265} height={265} />
      </View>
      <View style={styles.glowLarge}>
        <GlowBlobLarge width={363} height={363} />
      </View>
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
    left: -173,
    top: 56,
    width: 265,
    height: 265,
    transform: [{rotate: "90deg"}],
  },
  glowLarge: {
    position: "absolute",
    left: -187,
    top: 692,
    width: 363,
    height: 363,
    transform: [{rotate: "90deg"}],
  },
});
