import {StyleSheet, View} from "react-native";

import sessionBackground from "@/assets/kriya-session-bg.png";
import GlowBlobSmall from "@/assets/svg/GlowBlobSmall.svg";
import {GradientImageBackground} from "@/components";
import {colors} from "@/core/theme";

export function SessionBackground() {
  return (
    <View style={styles.base}>
      <GradientImageBackground
        image={sessionBackground}
        imageStyle={styles.imageLayer}
        gradientColors={colors.sessionGradient}
        gradientLocations={[0.0733, 0.1393, 0.2077, 0.3154, 0.6006, 1]}>
        <View style={styles.glowSmall}>
          <GlowBlobSmall width={265} height={265} />
        </View>
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
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.68,
  },
  glowSmall: {
    position: "absolute",
    left: -173,
    top: 56,
    width: 265,
    height: 265,
    transform: [{rotate: "90deg"}],
  },
});
