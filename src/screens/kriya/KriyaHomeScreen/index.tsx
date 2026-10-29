import {useAuthStore} from "@/store";
import {canApplyForSwarajKriya} from "@/utils";

import {KriyaLandingScreen} from "../KriyaLandingScreen";
import {SwarajKriyaIntroScreen} from "../SwarajKriyaIntroScreen";

// The Kriya tab: Free and Premium users get the SwaRaj Kriya introduction
// (and the course application); SK users — and sign-ins without a dummy
// account, as before — keep the Kriya practice landing.
export function KriyaHomeScreen() {
  const userType = useAuthStore(s => s.user?.userType);

  return canApplyForSwarajKriya(userType) ? (
    <SwarajKriyaIntroScreen />
  ) : (
    <KriyaLandingScreen />
  );
}
