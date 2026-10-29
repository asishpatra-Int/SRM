import type {
  SendOtpRequest,
  SendOtpResponse,
  UserModel,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/models/auth";

import {withMockLatency} from "../MockLatency";

// Mock auth service — the single source of the dummy accounts until the
// backend exists. Swap these bodies for ApiClient calls; callers keep the
// same request/response models.
const MOCK_USERS: readonly UserModel[] = [
  {mobileNumber: "7477880634", userType: "free"},
  {mobileNumber: "8477880634", userType: "premium"},
  {mobileNumber: "9477880634", userType: "sk"},
];

const MOCK_OTP = "00000";

function findUser(mobileNumber: string) {
  return MOCK_USERS.find(user => user.mobileNumber === mobileNumber);
}

export function sendOtp({mobileNumber}: SendOtpRequest) {
  const response: SendOtpResponse = findUser(mobileNumber)
    ? {isSuccess: true}
    : {isSuccess: false, errorCode: "UNREGISTERED_MOBILE_NUMBER"};
  return withMockLatency(response);
}

export function verifyOtp({mobileNumber, otp}: VerifyOtpRequest) {
  const user = findUser(mobileNumber);
  let response: VerifyOtpResponse;
  if (!user) {
    response = {isSuccess: false, errorCode: "UNREGISTERED_MOBILE_NUMBER"};
  } else if (otp !== MOCK_OTP) {
    response = {isSuccess: false, errorCode: "INCORRECT_OTP"};
  } else {
    response = {isSuccess: true, user: {...user}};
  }
  return withMockLatency(response);
}
