export type SendOtpResponse =
  | {isSuccess: true}
  | {isSuccess: false; errorCode: "UNREGISTERED_MOBILE_NUMBER"};
