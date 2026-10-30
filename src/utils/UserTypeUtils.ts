import type {UserType} from "@/models/auth";

// The one place user-type rules live. Free and Premium users see the
// SwaRaj Kriya introduction (and can apply for the course); SK users keep
// the Kriya practice flow. Tab bar theming builds on this in
// TabBarThemeUtils.
export function canApplyForSwarajKriya(userType: UserType | null | undefined) {
  return userType === "free" || userType === "premium";
}

// Guests and Free users get the light, Explore-style Practice tab (screen
// and tab bar); everyone else keeps the dark Kriya-themed Practice tab.
export function usesLightPracticeTheme(
  userType: UserType | null | undefined,
  isGuest: boolean,
) {
  return isGuest || userType === "free";
}
