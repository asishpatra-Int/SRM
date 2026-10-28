import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import splashBackground from "@/assets/explore-blog-aum-bg.png";
import glowBlobLarge from "@/assets/GlowBlobLarge.png";

type SplashBackgroundProps = {
  onLoad: () => void;
};

// Splash stage 1 (Figma 1577:261): the glow-orb artwork plus the bottom-left
// gold glow. Static for the whole sequence — later stages only add layers.
// The artwork is the same file the Explore blog screen already ships.
export function SplashBackground({onLoad}: SplashBackgroundProps) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Image
        source={splashBackground}
        style={styles.art}
        contentFit="fill"
        transition={0}
        onLoad={onLoad}
        onError={onLoad}
      />
      <Image source={glowBlobLarge} style={styles.glow} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma frame (-164, -342, 999×1944) with the image cropped to
  // top 5.89%, w 96.65%, h 96.97%.
  art: {
    position: "absolute",
    left: -164,
    top: -227.5,
    width: 965.5,
    height: 1885.1,
  },
  // anchor box 363 @ (-187, 692); native size 619x619
  glow: {
    position: "absolute",
    left: -315,
    top: 564,
    width: 619,
    height: 619,
  },
});
