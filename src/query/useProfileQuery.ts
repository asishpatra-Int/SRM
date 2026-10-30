import {ProfileService} from "@/service/network/api";

import {useAsyncCall} from "./useAsyncCall";

export function useProfileQuery() {
  const purchaseSubscription = useAsyncCall(
    ProfileService.purchaseSubscription,
  );

  return {
    callPurchaseSubscription: purchaseSubscription.run,
    isPurchaseSubscriptionLoading: purchaseSubscription.isLoading,
  };
}
