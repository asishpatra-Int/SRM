export type AttendedEventType =
  | "LIVE_EVENTS"
  | "SCREENING_SATSANGS"
  | "DHYAN_SANGHA"
  | "RETREAT"
  | "NEVER_ATTENDED";

export interface SwarajKriyaApplicationRequest {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  country: string;
  state: string;
  city: string;
  reason: string;
  attendedEvents: AttendedEventType[];
  hasWatchedSatsangSeries: boolean;
  hasDoneSrmCourse: boolean;
}
