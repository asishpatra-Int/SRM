import type {
  SwarajKriyaApplicationRequest,
  SwarajKriyaApplicationResponse,
} from "@/models/kriya";

import {withMockLatency} from "../MockLatency";

// Mock: nothing is sent anywhere; the application is accepted locally.
export function submitSwarajKriyaApplication(
  request: SwarajKriyaApplicationRequest,
) {
  const response: SwarajKriyaApplicationResponse = {
    applicationId: `mock-${request.mobileNumber}-${Date.now()}`,
  };
  return withMockLatency(response);
}
