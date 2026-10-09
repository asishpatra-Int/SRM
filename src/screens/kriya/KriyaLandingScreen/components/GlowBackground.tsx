import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import GlowBlobLarge from "@/assets/svg/GlowBlobLarge.svg";
import GlowBlobSmall from "@/assets/svg/GlowBlobSmall.svg";
import heroBackground from "@/assets/kriya-hero-bg.png";
import { colors } from "@/core/theme";

export function GlowBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.heroLayer}>
        <Image source={heroBackground} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient
          colors={colors.heroGradient}
          locations={[0.105, 0.333, 0.511, 0.646]}
          start={{ x: 0.52, y: 0 }}
          end={{ x: 0.48, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.backgroundOverlay }]} />
      <View style={styles.glowSmall}>
        <GlowBlobSmall width={265} height={265} />
      </View>
      <View style={styles.glowLarge}>
        <GlowBlobLarge width={363} height={363} />
      </View>
    </View>
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
    transform: [{ rotate: "90deg" }],
  },
  glowLarge: {
    position: "absolute",
    left: -187,
    top: 692,
    width: 363,
    height: 363,
    transform: [{ rotate: "90deg" }],
  },
});
