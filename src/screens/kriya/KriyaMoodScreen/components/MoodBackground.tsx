import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import glowBlobSmall from "@/assets/GlowBlobSmall.png";
import moodBackground from "@/assets/kriya-mood-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

const IMAGE_OPACITY = 0.82;

// Same ambient-glow fix as GlowBackground/SessionBackground: Figma's export
// of this glow is a tiny circle plus an SVG feGaussianBlur filter, which
// react-native-svg cannot render — this PNG has the blur baked into the
// pixels at the filter's native size, re-centred on the small anchor box
// (left: -173, top: 56, size: 265) Figma's export used.
export function MoodBackground() {
  return (
    <View style={styles.base}>
      <GradientImageBackground
        image={moodBackground}
        imageStyle={styles.imageLayer}
        imageOpacity={IMAGE_OPACITY}
        gradientColors={colors.moodGradient}
        gradientLocations={[0.10046, 0.5]}>
        <Image source={glowBlobSmall} style={styles.glowSmall} />
      </GradientImageBackground>
    </View>
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
    left: -262,
    top: -245,
    width: 940,
    height: 2106,
  },
  glowSmall: {
    position: "absolute",
    left: -568,
    top: -339,
    width: 1055,
    height: 1055,
  },
});
