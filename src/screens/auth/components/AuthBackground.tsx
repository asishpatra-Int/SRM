import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import authBackground from "@/assets/auth-bg.png";
import glowBlobLarge from "@/assets/GlowBlobLarge.png";

// Shared by Onboarding, Login and OTP (Figma 1580:820 / 882 / 971): the lotus
// glow artwork, rotated -4.12°, plus the bottom-left gold glow. The glow is
// the same Figma "Ellipse 10" the Kriya landing screen uses, so it reuses
// that screen's baked-blur PNG at the same anchor.
export function AuthBackground() {
  return (
    <View style={styles.root} pointerEvents="none">
      <View style={styles.artFrame}>
        <Image
          source={authBackground}
          style={styles.art}
          contentFit="fill"
          transition={0}
        />
      </View>
      <Image source={glowBlobLarge} style={styles.glow} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
  },
  // Figma: a 741.489×1346 frame rotated -4.12° whose rotated bounds sit at
  // (-122, -255, 836.181×1395.746) — i.e. centred on (296.09, 442.87).
  artFrame: {
    position: "absolute",
    left: -74.65,
    top: -230.13,
    width: 741.489,
    height: 1346,
    overflow: "hidden",
    transform: [{rotate: "-4.12deg"}],
  },
  // Crop inside the frame: h 99.99%, left -1.93%, top 2.74%, w 101.88%.
  art: {
    position: "absolute",
    left: -14.31,
    top: 36.88,
    width: 755.43,
    height: 1345.87,
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
