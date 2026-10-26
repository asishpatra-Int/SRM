import {StyleSheet, View} from "react-native";

import exploreAmbientGlow from "@/assets/explore-blog-aum-bg.png";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

// Same ambient glow image the Latest Blogs rows reuse as a thumbnail
// background — blown up and offset here, exactly as Figma has it, to wash
// the whole screen in a warm cream/lavender tint instead of a flat white
// page background.
export function ExploreBackground() {
  return (
    <GradientImageBackground
      image={exploreAmbientGlow}
      imageStyle={styles.glowLayer}
      gradientColors={colors.exploreBackgroundGradient}>
      <View style={styles.goldAccent} />
    </GradientImageBackground>
  );
}

const styles = StyleSheet.create({
  glowLayer: {
    position: "absolute",
    left: -181,
    top: -144,
    width: 818,
    height: 1966,
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
