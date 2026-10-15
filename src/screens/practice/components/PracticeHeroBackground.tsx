import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import glowBlobLarge from "@/assets/GlowBlobLarge.png";
import heroBackground from "@/assets/kriya-hero-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// Same hero image, overlay and single large ambient glow as
// PracticeBackground/ContentDetailsBackground — shared by the Bookmarks and
// Downloads screens, the first two screens in this feature group to need it
// a third and fourth time.
export function PracticeHeroBackground() {
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
  glowLarge: {
    position: "absolute",
    left: -315,
    top: 564,
    width: 619,
    height: 619,
  },
});
