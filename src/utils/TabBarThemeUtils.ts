import type {UserType} from "@/models/auth";

import {canApplyForSwarajKriya} from "./UserTypeUtils";

// Explore and Profile are light screens, so they always get the light tab
// bar (Figma 1591:8800, 1671:1542) — whoever is signed in, SK included.
const LIGHT_TAB_BAR_PATHS: readonly string[] = ["/explore", "/profile"];

// Free and Premium users get the light bar on every tab (Figma 1580:1382);
// everyone else keeps the dark bar on the Kriya and Practice tabs.
export function getTabBarTheme(
  userType: UserType | null | undefined,
  pathname: string,
) {
  return canApplyForSwarajKriya(userType) ||
    LIGHT_TAB_BAR_PATHS.includes(pathname)
    ? "light"
    : "dark";
}
