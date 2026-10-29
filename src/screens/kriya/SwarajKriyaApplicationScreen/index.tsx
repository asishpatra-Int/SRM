import {useRef, useState} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {Redirect, router} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";

import CalendarFieldIcon from "@/assets/svg/kriya/CalendarFieldIcon.svg";
import {AppButton, AppMobileNumberField} from "@/components";
import {spacing} from "@/core/theme";
import type {AttendedEventType} from "@/models/kriya";
import {useKriyaQuery} from "@/query";
import {
  type SwarajKriyaApplicationFormErrors,
  type SwarajKriyaApplicationFormValues,
  validateSwarajKriyaApplication,
} from "@/schema/kriya";
import {useAuthStore} from "@/store";
import {canApplyForSwarajKriya, formatDateOfBirthInput} from "@/utils";

import {KriyaLightBackground} from "../components";
import {APPLICATION_COUNTRY, ATTENDED_EVENT_OPTIONS} from "../mockData";

import {
  ApplicationHeader,
  AttendedEventChip,
  FormField,
  FormTextInput,
  StaticSelectField,
  YesNoToggleRow,
} from "./components";

const DIAL_CODE = "+91";
const MOBILE_NUMBER_LENGTH = 10;
const NEVER_ATTENDED: AttendedEventType = "NEVER_ATTENDED";

// Starts blank — including the contact number, which is never prefilled
// from the signed-in account.
const INITIAL_VALUES: SwarajKriyaApplicationFormValues = {
  fullName: "",
  mobileNumber: "",
  dateOfBirth: "",
  state: "",
  city: "",
  reason: "",
  attendedEvents: [],
  hasWatchedSatsangSeries: false,
  hasDoneSrmCourse: false,
};

// SwaRaj Kriya course application (Figma 1580:1721) for Free and Premium
// users. Submission is mocked locally; success shows the confirmation.
export function SwarajKriyaApplicationScreen() {
  const userType = useAuthStore(s => s.user?.userType);
  const {
    callSubmitSwarajKriyaApplication,
    isSubmitSwarajKriyaApplicationLoading: isSubmitting,
  } = useKriyaQuery();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [values, setValues] =
    useState<SwarajKriyaApplicationFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<SwarajKriyaApplicationFormErrors>({});

  // SK users (and anyone without a Free/Premium account) never apply.
  if (!canApplyForSwarajKriya(userType)) {
    return <Redirect href="/" />;
  }

  const setField = <K extends keyof SwarajKriyaApplicationFormValues>(
    field: K,
    value: SwarajKriyaApplicationFormValues[K],
  ) => {
    setValues(current => ({...current, [field]: value}));
    setErrors(current => ({...current, [field]: undefined}));
  };

  // "Never Attended" excludes every other option, and vice versa.
  const toggleAttendedEvent = (event: AttendedEventType) => {
    const current = values.attendedEvents;
    let next: AttendedEventType[];
    if (current.includes(event)) {
      next = current.filter(item => item !== event);
    } else if (event === NEVER_ATTENDED) {
      next = [NEVER_ATTENDED];
    } else {
      next = [...current.filter(item => item !== NEVER_ATTENDED), event];
    }
    setField("attendedEvents", next);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleApply = async () => {
    if (isSubmitting) {
      return;
    }
    const nextErrors = validateSwarajKriyaApplication(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      scrollRef.current?.scrollTo({y: 0, animated: true});
      return;
    }
    await callSubmitSwarajKriyaApplication({
      ...values,
      fullName: values.fullName.trim(),
      state: values.state.trim(),
      city: values.city.trim(),
      reason: values.reason.trim(),
      country: APPLICATION_COUNTRY,
    });
    router.replace("/swaraj-kriya-application-submitted");
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KriyaLightBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <KeyboardAvoidingView
          style={styles.safeArea}
          behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <ApplicationHeader
              title="Apply for SwaRaj Kriya"
              onBackPress={handleBack}
            />

            <View style={styles.form}>
              <FormField label="Enter Full Name*" error={errors.fullName}>
                <FormTextInput
                  value={values.fullName}
                  placeholder="Full Name"
                  accessibilityLabel="Full name"
                  autoCapitalize="words"
                  textContentType="name"
                  onChangeText={text => setField("fullName", text)}
                />
              </FormField>

              <FormField
                label="Enter Contact Number*"
                error={errors.mobileNumber}>
                <AppMobileNumberField
                  dialCode={DIAL_CODE}
                  value={values.mobileNumber}
                  maxLength={MOBILE_NUMBER_LENGTH}
                  placeholder="9876543210"
                  onChangeText={text =>
                    setField("mobileNumber", text.replace(/\D/g, ""))
                  }
                />
              </FormField>

              <FormField label="Your Date of Birth*" error={errors.dateOfBirth}>
                <FormTextInput
                  value={values.dateOfBirth}
                  placeholder="dd-mm-yyyy"
                  accessibilityLabel="Date of birth, dd-mm-yyyy"
                  keyboardType="number-pad"
                  maxLength={10}
                  onChangeText={text =>
                    setField("dateOfBirth", formatDateOfBirthInput(text))
                  }
                  trailingIcon={
                    <CalendarFieldIcon width={15.5} height={17.5} />
                  }
                />
              </FormField>

              <FormField
                label="Your Address*"
                error={errors.state ?? errors.city}>
                <View style={styles.addressFields}>
                  <StaticSelectField
                    value={APPLICATION_COUNTRY}
                    accessibilityLabel="Country"
                  />
                  <FormTextInput
                    value={values.state}
                    placeholder="State/Province/Region"
                    accessibilityLabel="State, province or region"
                    autoCapitalize="words"
                    onChangeText={text => setField("state", text)}
                  />
                  <FormTextInput
                    value={values.city}
                    placeholder="City"
                    accessibilityLabel="City"
                    autoCapitalize="words"
                    textContentType="addressCity"
                    onChangeText={text => setField("city", text)}
                  />
                </View>
              </FormField>

              <FormField label="Why Do You Want to Learn SwaRaj Kriya?">
                <FormTextInput
                  value={values.reason}
                  placeholder="Your Answer"
                  accessibilityLabel="Why do you want to learn SwaRaj Kriya?"
                  isMultiline
                  onChangeText={text => setField("reason", text)}
                />
              </FormField>

              <FormField
                label="Which Events Have You Attended Before*"
                error={errors.attendedEvents}>
                <View style={styles.chips}>
                  {ATTENDED_EVENT_OPTIONS.map(option => (
                    <AttendedEventChip
                      key={option.id}
                      label={option.label}
                      isSelected={values.attendedEvents.includes(option.id)}
                      onPress={() => toggleAttendedEvent(option.id)}
                    />
                  ))}
                </View>
              </FormField>

              <View style={styles.toggles}>
                <YesNoToggleRow
                  question="Have You Watched Any Satsang Series?*"
                  value={values.hasWatchedSatsangSeries}
                  onValueChange={value =>
                    setField("hasWatchedSatsangSeries", value)
                  }
                />
                <YesNoToggleRow
                  question="Have You Done Any SRM Course?*"
                  value={values.hasDoneSrmCourse}
                  onValueChange={value => setField("hasDoneSrmCourse", value)}
                />
              </View>
            </View>
          </ScrollView>

          <View
            style={[
              styles.footer,
              {paddingBottom: Math.max(insets.bottom, spacing.md)},
            ]}>
            <AppButton
              label="Apply Now"
              onPress={handleApply}
              isLoading={isSubmitting}
            />
          </View>
        </KeyboardAvoidingView>
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
  },
  // Figma: header → 24 → fields 32 apart, all on a 24pt inset.
  content: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    gap: spacing.xxl,
  },
  form: {
    gap: spacing.xxxl,
  },
  addressFields: {
    gap: spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  toggles: {
    gap: spacing.xxxl,
  },
  // Pinned CTA (Figma 1580:2325): 24 side inset, 10 above. A sibling of
  // the scroll view so it rides above the keyboard.
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingTop: 10,
  },
});
