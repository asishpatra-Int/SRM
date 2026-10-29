import type {UserModel} from "./UserModel";

export type VerifyOtpResponse =
  | {isSuccess: true; user: UserModel}
  | {
      isSuccess: false;
      errorCode: "UNREGISTERED_MOBILE_NUMBER" | "INCORRECT_OTP";
    };
