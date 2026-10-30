export const colors = {
  background: "#25005D",
  backgroundOverlay: "rgba(37, 37, 37, 0.55)",
  heroGradient: [
    "rgba(212, 212, 212, 0)",
    "rgba(81, 53, 123, 0.752)",
    "rgba(53, 19, 104, 0.912)",
    "#25005D",
  ] as const,
  cardGradient: [
    "rgba(37, 2, 89, 0.52)",
    "rgba(53, 25, 104, 0.52)",
    "rgba(86, 72, 134, 0.52)",
    "rgba(237, 182, 102, 0.52)",
  ] as const,
  sessionGradient: [
    "#2B1A6C",
    "rgba(48, 33, 107, 0.91)",
    "rgba(63, 52, 106, 0.654)",
    "rgba(102, 102, 102, 0)",
    "rgba(54, 41, 107, 0.808)",
    "#2B1A6C",
  ] as const,
  sessionCardGradient: [
    "rgba(37, 2, 89, 0.5)",
    "rgba(237, 182, 102, 0.5)",
  ] as const,
  sessionBackgroundBase: "#331F69",
  textPrimary: "#FAF9FF",
  textOnDark: "#FFFFFF",
  accentGold: "#EDB666",
  borderPurple: "#47348C",
  glassLight: "rgba(255, 255, 255, 0.1)",
  glassFaint: "rgba(255, 255, 255, 0.04)",
  glassBorder: "rgba(255, 255, 255, 0.16)",
  // Figma "window glass" inset highlight: inset 0 1px 1px #FFFFFF99.
  glassHighlight: "rgba(255, 255, 255, 0.6)",
  badgeBackground: "rgba(34, 23, 70, 0.4)",
  tabBarTint: "rgba(37, 37, 37, 0.4)",
  tabActivePill: "rgba(255, 255, 255, 0.06)",
  // Light tab bar (Figma 1580:1382) — Free/Premium users: 80% white glass,
  // grey active pill, purple active icon, dark labels and inactive icons.
  tabBarLightBackground: "rgba(255, 255, 255, 0.8)",
  tabActivePillLight: "rgba(209, 209, 209, 0.33)",
  shadowColor: "rgba(0, 0, 0, 0.05)",
  // Figma value — the design leans entirely on the backdrop blur for the
  // sheet's weight, so this tint is nearly transparent on its own. Used on iOS.
  sheetBackground: "rgba(53, 31, 111, 0.08)",
  // Android only: a React Native Modal is its own window there, so a backdrop
  // blur has nothing of the screen behind it to sample. Same hue, carrying the
  // sheet's weight itself instead of relying on a blur that cannot happen.
  sheetBackgroundAndroid: "rgba(53, 31, 111, 0.92)",
  sheetScrim: "rgba(0, 0, 0, 0.45)",
  ctaTextDark: "#250259",
  timeLabelDark: "#321556",
  progressTrackFaint: "rgba(32, 19, 47, 0.4)",
  progressFillFrom: "#FFFFFF",
  progressFillTo: "#FF9822",
  equalizerBar: "rgba(255, 255, 255, 0.85)",
  moodGradient: ["#2B1A6C", "rgba(102, 102, 102, 0)"] as const,
  moodSliderTrack: "rgba(255, 255, 255, 0.14)",
  chipBackground: "rgba(255, 255, 255, 0.2)",
  // Figma's `palette/tone-04` — a design-system token bound to this exact
  // chip component, distinct from the app's CTA gold (accentGold).
  chipBackgroundSelected: "#D89F53",
  noteInputBackground: "rgba(255, 255, 255, 0.08)",
  trackCardBackground: "rgba(255, 255, 255, 0.08)",
  trackActionBackground: "rgba(255, 255, 255, 0.15)",
  contentDescription: "#F6F4F1",
  contentGuidanceText: "#DED6EF",
  pillLabelDark: "#201A2E",
  // Explore tab — the only screen with a light theme; every other tab is
  // the dark `background` purple above.
  exploreBackground: "#FFFFFF",
  exploreTextMuted: "#6B6870",
  exploreTextFaint: "#E1E1E1",
  exploreIconDark: "#141313",
  exploreSearchBackground: "#E3D8C8",
  exploreChipInactiveBackground: "rgba(255, 255, 255, 0.6)",
  exploreDivider: "rgba(107, 104, 112, 0.18)",
  exploreGlassButtonBackground: "rgba(37, 37, 37, 0.05)",
  exploreEventOverlayGradient: [
    "rgba(255, 255, 255, 0)",
    "rgba(137, 118, 165, 0.502)",
    "rgba(70, 40, 114, 0.79)",
    "rgba(37, 2, 89, 0.93)",
  ] as const,
  exploreEventOverlayLocations: [0.456, 0.605, 0.753, 0.948] as const,
  // No-op gradient — GradientImageBackground requires one, but the Explore
  // background image is already the full effect; no dark overlay on top.
  exploreBackgroundGradient: [
    "rgba(255, 255, 255, 0)",
    "rgba(255, 255, 255, 0)",
  ] as const,
  exploreGoldAccentGlow: "rgba(237, 182, 102, 0.15)",
  exploreBackButtonBackground: "rgba(255, 255, 255, 0.31)",
  exploreGlassCardBackground: "rgba(255, 255, 255, 0.37)",
  exploreBadgeBackground: "rgba(160, 160, 160, 0.12)",
  exploreBadgeText: "#000001",
  // Auth flow (splash → onboarding → login → OTP) — a light lavender theme.
  // Fallback only: every auth screen is fully covered by its background art.
  authBackground: "#F1E9EE",
  transparent: "transparent",
  authAccent: "#47348C",
  authTextDark: "#141313",
  authTextMuted: "#6B6870",
  authTextBlack: "#000001",
  authDividerLabel: "#201A2E",
  // Figma divider line: stroke #5F5A5A at 17% opacity.
  authDividerLine: "rgba(95, 90, 90, 0.17)",
  authInputBackground: "rgba(255, 255, 255, 0.67)",
  authSocialButtonBackground: "rgba(255, 255, 255, 0.99)",
  authErrorText: "#C0392B",
  // Onboarding card: the Kriya card hues at 0.79 alpha. Figma's last stop
  // sits at 122% of the gradient line; the line is stretched in the card
  // (see OnboardingCard) so these locations are the 0–1 rescaled values.
  authCardGradient: [
    "rgba(37, 2, 89, 0.79)",
    "rgba(53, 25, 104, 0.79)",
    "rgba(86, 72, 134, 0.79)",
    "rgba(237, 182, 102, 0.79)",
  ] as const,
  authCardGradientLocations: [0.1938, 0.4348, 0.6762, 1] as const,
  // SwaRaj Kriya intro card (Figma 1580:1274) reuses authCardGradient's hues
  // on a 114.92° line; its last stop (105.6%) is rescaled to 1.
  kriyaIntroCardGradientLocations: [0.2101, 0.4462, 0.6827, 1] as const,
  kriyaIntroEyebrow: "#FAF4ED",
  kriyaIntroRowBackground: "rgba(71, 52, 140, 0.08)",
  // SwaRaj Kriya application form (Figma 1580:1721).
  applicationChipBackground: "rgba(255, 255, 255, 0.34)",
  applicationChipLabel: "#5F5A5A",
  toggleTrackOff: "rgba(95, 90, 90, 0.3)",
  // Profile (Figma 1671:1324). The avatar gradient is sampled from the
  // design's placeholder avatar art.
  profileAvatarGradient: ["#A9B5DF", "#6E72B4"] as const,
  profileSettingsCardBackground: "rgba(255, 255, 255, 0.5)",
  profileSettingsDivider: "rgba(71, 52, 140, 0.07)",
  // "My Kriya" streak card: Kriya card hues at 0.74 alpha on a 163.79° line;
  // the 104.8% stop is rescaled to 1 (see PracticeSummaryCard).
  profileStreakCardGradient: [
    "rgba(37, 2, 89, 0.74)",
    "rgba(53, 25, 104, 0.74)",
    "rgba(86, 72, 134, 0.74)",
    "rgba(237, 182, 102, 0.74)",
  ] as const,
  profileStreakCardGradientLocations: [0.3129, 0.531, 0.7633, 1] as const,
  languageMenuBackground: "#FFFFFF",
  languageMenuDivider: "#EAEAEA",
  // Figma's 0 0 4px rgba(0,0,0,0.2) — the language menu and certificate
  // preview card.
  popoverShadow: "rgba(0, 0, 0, 0.2)",
  // Certificates (Figma 1643:12940).
  certificateImageOverlay: "rgba(0, 0, 0, 0.08)",
  certificateActionBackground: "#FFFFFF",
  certificatePreviewBackground: "#E5E5E5",
  certificatePreviewCloseBackground: "rgba(255, 255, 255, 0.15)",
  // Subscription plan card (Figma 1643:13397): opaque, on a 131.23° line;
  // the 116.27% stop is rescaled to 1 (see SubscriptionPlanCard).
  subscriptionPlanGradient: [
    "#250259",
    "#351968",
    "#734E67",
    "#EDB666",
  ] as const,
  subscriptionPlanGradientLocations: [0.0628, 0.2535, 0.794, 1] as const,
  ctaLightBackground: "#FFFFFF",
} as const;
