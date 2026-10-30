import {StyleSheet} from "react-native";

import ambientGlow from "@/assets/explore-blog-aum-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// The "Luminous background" behind the Profile and Payment Done frames
// (Figma 1671:1325 / 1640:12189): the shared ambient glow image, blown up
// and offset exactly as Figma places it.
export function ProfileLuminousBackground() {
  return (
    <GradientImageBackground
      image={ambientGlow}
      imageStyle={styles.glowLayer}
      gradientColors={colors.exploreBackgroundGradient}
    />
  );
}

const styles = StyleSheet.create({
  // Frame (-336, -297) 1487×3224; image fill 97.09% × 97.09%, top 5.89%.
  glowLayer: {
    position: "absolute",
    left: -336,
    top: -107,
    width: 1444,
    height: 3130,
  },
});
