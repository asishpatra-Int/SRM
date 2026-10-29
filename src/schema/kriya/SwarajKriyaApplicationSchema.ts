import type {AttendedEventType} from "@/models/kriya";

// SwaRaj Kriya application form rules. Zod isn't installed yet, so this is a
// plain validator with the same contract a Zod schema would give the screen:
// form values in, a message per invalid field out (empty when valid).

export type SwarajKriyaApplicationFormValues = {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  state: string;
  city: string;
  reason: string;
  attendedEvents: AttendedEventType[];
  hasWatchedSatsangSeries: boolean;
  hasDoneSrmCourse: boolean;
};

export type SwarajKriyaApplicationFormErrors = Partial<
  Record<keyof SwarajKriyaApplicationFormValues, string>
>;

const MOBILE_NUMBER_PATTERN = /^\d{10}$/;
const DATE_OF_BIRTH_PATTERN = /^(\d{2})-(\d{2})-(\d{4})$/;
const EARLIEST_BIRTH_YEAR = 1900;

function isValidDateOfBirth(value: string) {
  const match = DATE_OF_BIRTH_PATTERN.exec(value);
  if (!match) {
    return false;
  }
  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  return isRealDate && year >= EARLIEST_BIRTH_YEAR && date <= new Date();
}

export function validateSwarajKriyaApplication(
  values: SwarajKriyaApplicationFormValues,
): SwarajKriyaApplicationFormErrors {
  const errors: SwarajKriyaApplicationFormErrors = {};
  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name";
  }
  if (!MOBILE_NUMBER_PATTERN.test(values.mobileNumber)) {
    errors.mobileNumber = "Enter a valid 10-digit mobile number";
  }
  if (!isValidDateOfBirth(values.dateOfBirth)) {
    errors.dateOfBirth = "Enter a valid date of birth (dd-mm-yyyy)";
  }
  if (!values.state.trim()) {
    errors.state = "Enter your state, province or region";
  }
  if (!values.city.trim()) {
    errors.city = "Enter your city";
  }
  if (values.attendedEvents.length === 0) {
    errors.attendedEvents = "Select at least one option";
  }
  return errors;
}
