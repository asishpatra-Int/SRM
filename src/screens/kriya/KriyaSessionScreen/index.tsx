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

type KriyaSessionScreenProps = {
  practiceId?: string;
};

export function KriyaSessionScreen({practiceId}: KriyaSessionScreenProps) {
  const session = getPracticeSessionById(practiceId);

  return (
    <View style={styles.root}>
      <SessionBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <SessionExitButton onPress={() => router.back()} />
        <View style={styles.artworkArea}>
          <SessionArtwork />
        </View>
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
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  artworkArea: {
    flex: 1,
    justifyContent: "center",
  },
  playerArea: {
    marginBottom: spacing.xxxl,
  },
});
