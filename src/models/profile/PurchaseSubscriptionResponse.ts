export type PurchaseSubscriptionErrorCode = "PAYMENT_FAILED";

export type PurchaseSubscriptionResponse =
  | {isSuccess: true; transactionId: string}
  | {isSuccess: false; errorCode: PurchaseSubscriptionErrorCode};
