import {StyleSheet, View} from "react-native";

import ambientGlow from "@/assets/explore-blog-aum-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// The light cream/lavender wash behind the SwaRaj Kriya intro, application
// and confirmation screens (Figma 1580:1214 / 1721 / 2233): the shared
// ambient glow image at Figma's offset, plus the soft gold accent bottom-left.
export function KriyaLightBackground() {
  return (
    <GradientImageBackground
      image={ambientGlow}
      imageStyle={styles.glowLayer}
      gradientColors={colors.exploreBackgroundGradient}>
      <View style={styles.goldAccent} />
    </GradientImageBackground>
  );
}

const styles = StyleSheet.create({
  // Frame (-164, -342) 999×1944; image fill w 96.65% h 96.97% top 5.89%.
  glowLayer: {
    position: "absolute",
    left: -164,
    top: -227.5,
    width: 965.5,
    height: 1885,
  },
  goldAccent: {
    position: "absolute",
    left: -187,
    top: 692,
    width: 363,
    height: 363,
    borderRadius: 182,
    backgroundColor: colors.exploreGoldAccentGlow,
  },
});
