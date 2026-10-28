import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import glowBlobSplash from "@/assets/GlowBlobSplash.png";
import splashPortrait from "@/assets/splash-portrait.png";

// Splash stage 2 (Figma 1577:285): Sri Guru's portrait anchored to the bottom
// edge, with the purple glow ("Ellipse 17") behind it. Figma exports that
// glow as a circle + feGaussianBlur, which react-native-svg can't render, so
// it ships as a PNG with the blur baked in (r 267, #47348C, σ 131.8) at the
// filter's native 1061×1061 canvas.
export function SplashPortrait() {
  return (
    <View style={styles.root} pointerEvents="none">
      <Image source={glowBlobSplash} style={styles.glow} />
      <View style={styles.portraitFrame}>
        <Image
          source={splashPortrait}
          style={styles.portrait}
          contentFit="fill"
          transition={0}
        />
      </View>
    </View>
  );
}

const PORTRAIT_WIDTH = 402;
const PORTRAIT_HEIGHT = 469;

const styles = StyleSheet.create({
  // A 402×469 box pinned bottom-centre, as in Figma; the glow is positioned
  // relative to it so both stay together on any screen height.
  root: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: PORTRAIT_WIDTH,
    height: PORTRAIT_HEIGHT,
  },
  // anchor box 534 @ (-58, 511) in the 874-high frame → (-58, 106) in this
  // box; native canvas 1061 extends 263.6 beyond it on each side.
  glow: {
    position: "absolute",
    left: -321.6,
    top: -157.6,
    width: 1061,
    height: 1061,
  },
  portraitFrame: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
  },
  // Crop: h 100%, left -117.74%, w 244.61%.
  portrait: {
    position: "absolute",
    top: 0,
    left: -473.3,
    width: 983.33,
    height: PORTRAIT_HEIGHT,
  },
});
