import {StyleSheet, View} from "react-native";

import {Image} from "expo-image";

import artwork from "@/assets/kriya-session-artwork.png";
import GlowBlobSession from "@/assets/svg/GlowBlobSession.svg";

export function SessionArtwork() {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.glow}>
        <GlowBlobSession width={251} height={251} />
      </View>
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
  glow: {
    position: "absolute",
    left: 29,
    top: 22,
    width: 251,
    height: 251,
  },
  image: {
    position: "absolute",
    left: 21,
    top: 32,
    width: 266,
    height: 271,
  },
});
