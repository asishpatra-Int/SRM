import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import artwork from "@/assets/kriya-session-artwork.png";

// Figma: a 308x313 frame holding a 266x271 image inset 32 from its top.
// The glowing ring behind the lotus is baked into the screen's background
// image, so there is no separate glow layer here.
export function SessionArtwork() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Image source={artwork} style={styles.image} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 308,
    height: 313,
    alignSelf: "center",
  },
  image: {
    position: "absolute",
    left: 21,
    top: 32,
    width: 266,
    height: 271,
  },
});
