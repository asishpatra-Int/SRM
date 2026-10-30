import type {
  PurchaseSubscriptionRequest,
  PurchaseSubscriptionResponse,
} from "@/models/profile";

import {withMockLatency} from "../MockLatency";

// Mock: no payment gateway is integrated yet — nothing is charged and no
// request leaves the device; every purchase succeeds after the stand-in
// round-trip. Swap the body for the gateway/ApiClient call; callers keep
// the same request/response models.
export function purchaseSubscription({planId}: PurchaseSubscriptionRequest) {
  const response: PurchaseSubscriptionResponse = {
    isSuccess: true,
    transactionId: `mock-${planId}-${Date.now()}`,
  };
  return withMockLatency(response);
}
