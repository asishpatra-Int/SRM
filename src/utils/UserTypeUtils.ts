import type {UserType} from "@/models/auth";

// The one place user-type rules live. Free and Premium users see the
// SwaRaj Kriya introduction (and can apply for the course) plus the light
// tab bar; SK users keep the Kriya practice flow and its dark tab bar.
export function canApplyForSwarajKriya(userType: UserType | null | undefined) {
  return userType === "free" || userType === "premium";
}
