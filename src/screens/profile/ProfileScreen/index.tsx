import {useRef, useState} from "react";

import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewInstance,
} from "react-native";

import {router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

import AccountSettingsIcon from "@/assets/svg/profile/AccountSettingsIcon.svg";
import HelpSupportIcon from "@/assets/svg/profile/HelpSupportIcon.svg";
import LanguageIcon from "@/assets/svg/profile/LanguageIcon.svg";
import SubscriptionIcon from "@/assets/svg/profile/SubscriptionIcon.svg";
import {AppButton, AppText} from "@/components";
import {colors, spacing, typography} from "@/core/theme";
import {EventCard, SectionHeading} from "@/screens/explore/components";
import {getEventById} from "@/screens/explore/mockData";
import {useAuthStore} from "@/store";
import {getInitials} from "@/utils";

import {CertificateCard, ProfileLuminousBackground} from "../components";
import {
  getMockProfile,
  LANGUAGE_OPTIONS,
  type LanguageId,
  MOCK_CERTIFICATES,
  MOCK_REGISTERED_EVENT_IDS,
} from "../mockData";

import {
  LANGUAGE_MENU_HEIGHT,
  LanguageMenu,
  type LanguageMenuPosition,
  PracticeSummaryCard,
  ProfileIdentityCard,
  SettingsRow,
} from "./components";

// My Profile (Figma 1671:1324). Content follows the signed-in dummy
// account's type: SwaRaj Kriya members also get their program chips and
// the "My Kriya" streak.
export function ProfileScreen() {
  const userType = useAuthStore(s => s.user?.userType);
  const logOut = useAuthStore(s => s.logOut);
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const languageRowRef = useRef<ViewInstance>(null);
  const [languageId, setLanguageId] = useState<LanguageId>("en");
  const [languageMenuPosition, setLanguageMenuPosition] =
    useState<LanguageMenuPosition | null>(null);

  const profile = getMockProfile(userType);
  const detailLabels = [profile.programLabel, profile.leaderLabel].filter(
    (label): label is string => label !== undefined,
  );
  const registeredEvents = MOCK_REGISTERED_EVENT_IDS.map(getEventById);
  const selectedLanguageLabel =
    LANGUAGE_OPTIONS.find(option => option.id === languageId)?.label ?? "";

  const openCertificates = () => router.push("/certificates");

  const openEvent = (eventId: string) => {
    router.push({pathname: "/events/[eventId]", params: {eventId}});
  };

  // Drops the menu under the Language row (or above it, near the bottom of
  // the screen), right-aligned with the row.
  const openLanguageMenu = () => {
    languageRowRef.current?.measureInWindow((x, y, width, height) => {
      const fitsBelow = y + height + LANGUAGE_MENU_HEIGHT <= windowHeight;
      setLanguageMenuPosition({
        top: fitsBelow ? y + height : y - LANGUAGE_MENU_HEIGHT,
        right: windowWidth - (x + width),
      });
    });
  };

  const selectLanguage = (id: LanguageId) => {
    setLanguageId(id);
    setLanguageMenuPosition(null);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ProfileLuminousBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <AppText style={styles.pageTitle} accessibilityRole="header">
              My Profile
            </AppText>
            <ProfileIdentityCard
              fullName={profile.fullName}
              initials={getInitials(profile.fullName)}
              membershipLabel={profile.membershipLabel}
              detailLabels={detailLabels}
            />
          </View>

          {profile.practiceSummary && (
            <View style={styles.section}>
              <SectionHeading
                title="My Kriya"
                onPress={() => router.navigate("/")}
              />
              <PracticeSummaryCard
                title={profile.practiceSummary.title}
                sessionsLabel={profile.practiceSummary.sessionsLabel}
                hoursLabel={profile.practiceSummary.hoursLabel}
              />
            </View>
          )}

          <View style={styles.sectionFullBleed}>
            <View style={styles.sectionHeadingInset}>
              <SectionHeading
                title={`Upcoming Events (${registeredEvents.length})`}
                onPress={() => router.navigate("/explore")}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}>
              {registeredEvents.map(event => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  location={event.location}
                  dateTimeLabel={event.dateTimeLabel}
                  background={event.background}
                  onPress={() => openEvent(event.id)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionFullBleed}>
            <View style={styles.sectionHeadingInset}>
              <SectionHeading
                title={`My Certificates (${MOCK_CERTIFICATES.length})`}
                onPress={openCertificates}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}>
              {MOCK_CERTIFICATES.map(certificate => (
                <CertificateCard
                  key={certificate.id}
                  title={certificate.title}
                  issuedOnLabel={certificate.issuedOnLabel}
                  image={certificate.image}
                  onPress={openCertificates}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <SectionHeading title="Account & Preferences" showChevron={false} />
            <View style={styles.settingsGroups}>
              <View style={styles.settingsCard}>
                {/* No account-settings screen is designed yet. */}
                <SettingsRow
                  Icon={AccountSettingsIcon}
                  label="Account Settings"
                  hasDivider
                />
                <SettingsRow
                  ref={languageRowRef}
                  Icon={LanguageIcon}
                  label="Language"
                  value={selectedLanguageLabel}
                  hasDivider
                  onPress={openLanguageMenu}
                />
                <SettingsRow
                  Icon={SubscriptionIcon}
                  label="Subscription"
                  value={profile.subscriptionStatusLabel}
                  onPress={() => router.push("/subscription")}
                />
              </View>
              <View style={styles.settingsCard}>
                {/* No help & support screen is designed yet. */}
                <SettingsRow Icon={HelpSupportIcon} label="Help & Support" />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <AppButton label="Log Out" onPress={logOut} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <LanguageMenu
        position={languageMenuPosition}
        options={LANGUAGE_OPTIONS}
        selectedId={languageId}
        onSelect={selectLanguage}
        onClose={() => setLanguageMenuPosition(null)}
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
  // Figma: sections 48 apart; the bottom padding clears the floating tab
  // bar, as on Explore.
  content: {
    paddingTop: spacing.xl,
    paddingBottom: 140,
    gap: 48,
  },
  headerBlock: {
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  pageTitle: {
    ...typography.pageHeading,
    color: colors.borderPurple,
  },
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  // Unpadded so the card rows scroll the full screen width.
  sectionFullBleed: {
    gap: spacing.md,
  },
  sectionHeadingInset: {
    paddingHorizontal: spacing.xxl,
  },
  horizontalList: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  settingsGroups: {
    gap: spacing.md,
  },
  settingsCard: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.profileSettingsCardBackground,
  },
});
