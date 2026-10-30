import {useState} from "react";

import {ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import {spacing} from "@/core/theme";
import {ExploreBackground} from "@/screens/explore/components";

import {CertificateCard, ProfileSubpageHeader} from "../components";
import {type CertificateMock, MOCK_CERTIFICATES} from "../mockData";

import {CertificatePreviewModal} from "./components";

const SCREEN_INSET = spacing.xxl;
const COLUMN_GAP = spacing.md;

// My Certificates (Figma 1643:12940): a two-column grid; tapping a card
// (or its view button) opens the certificate preview (Figma 1640:12255).
export function CertificatesScreen() {
  const {width: windowWidth} = useWindowDimensions();
  const [previewCertificate, setPreviewCertificate] =
    useState<CertificateMock | null>(null);

  const cardWidth = (windowWidth - SCREEN_INSET * 2 - COLUMN_GAP) / 2;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ExploreBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <ProfileSubpageHeader
            title={`My Certificates (${MOCK_CERTIFICATES.length})`}
            onBackPress={handleBack}
          />
          <View style={styles.grid}>
            {MOCK_CERTIFICATES.map(certificate => (
              <CertificateCard
                key={certificate.id}
                title={certificate.title}
                issuedOnLabel={certificate.issuedOnLabel}
                image={certificate.image}
                onPress={() => setPreviewCertificate(certificate)}
                showActions
                style={{width: cardWidth}}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <CertificatePreviewModal
        image={previewCertificate?.image ?? null}
        title={previewCertificate?.title ?? ""}
        onClose={() => setPreviewCertificate(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  // Figma: header → 32 → rows 32 apart, columns 12 apart, 24pt inset.
  content: {
    paddingTop: spacing.md,
    paddingHorizontal: SCREEN_INSET,
    paddingBottom: spacing.xxl,
    gap: spacing.xxxl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: COLUMN_GAP,
    rowGap: spacing.xxxl,
  },
});
