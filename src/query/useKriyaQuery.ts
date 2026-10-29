import {KriyaService} from "@/service/network/api";

import {useAsyncCall} from "./useAsyncCall";

export function useKriyaQuery() {
  const submitApplication = useAsyncCall(
    KriyaService.submitSwarajKriyaApplication,
  );

  return {
    callSubmitSwarajKriyaApplication: submitApplication.run,
    isSubmitSwarajKriyaApplicationLoading: submitApplication.isLoading,
  };
}
