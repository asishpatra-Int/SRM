import {useRef} from "react";

import {StyleSheet, View} from "react-native";

import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";

import {getPracticeSessionById} from "../mockData";

import {
  PlayerCard,
  SessionArtwork,
  SessionBackground,
  SessionExitButton,
} from "./components";

// above the ring there while looking correct on iOS.
const RING_CENTRE_RATIO = `${(321.5 / 874) * 100}%`;
// Where the lotus sits inside SessionArtwork's 308x313 frame: 32 + 271/2.
const ARTWORK_CENTRE_OFFSET = 167.5;

type KriyaSessionScreenProps = {
  practiceId?: string;
};

export function KriyaSessionScreen({practiceId}: KriyaSessionScreenProps) {
  const session = getPracticeSessionById(practiceId);
  const blurTargetRef = useRef<View>(null);

  return (
    <View style={styles.root}>
      <SessionBackground blurTargetRef={blurTargetRef} />
      <View style={styles.artworkArea} pointerEvents="none">
        <SessionArtwork />
      </View>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <SessionExitButton
          onPress={() => router.back()}
          blurTarget={blurTargetRef}
        />
        <View style={styles.spacer} />
        <View style={styles.playerArea}>
          <PlayerCard
            title={session.title}
            elapsedTimeLabel={session.elapsedTimeLabel}
            progressRatio={session.progressRatio}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  artworkArea: {
    position: "absolute",
    left: 0,
    right: 0,
    top: RING_CENTRE_RATIO,
    alignItems: "center",
    transform: [{translateY: -ARTWORK_CENTRE_OFFSET}],
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  spacer: {
    flex: 1,
  },
  playerArea: {
    marginBottom: spacing.xxxl,
  },
});
