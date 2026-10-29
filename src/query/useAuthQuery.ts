import {AuthService} from "@/service/network/api";

import {useAsyncCall} from "./useAsyncCall";

export function useAuthQuery() {
  const sendOtp = useAsyncCall(AuthService.sendOtp);
  const verifyOtp = useAsyncCall(AuthService.verifyOtp);

  return {
    callSendOtp: sendOtp.run,
    isSendOtpLoading: sendOtp.isLoading,
    callVerifyOtp: verifyOtp.run,
    isVerifyOtpLoading: verifyOtp.isLoading,
  };
}
