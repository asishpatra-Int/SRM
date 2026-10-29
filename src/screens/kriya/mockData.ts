// Mock data standing in for the Kriya feature's backend/query layer.

import type {AttendedEventType} from "@/models/kriya";

export type PracticeSessionMock = {
  id: string;
  title: string;
  subtitle?: string;
  durationLabel: string;
  elapsedTimeLabel: string;
  progressRatio: number;
};

export const MOCK_TIMES_COMPLETED_TODAY = 1;

export const MOCK_PRACTICE_SESSIONS: PracticeSessionMock[] = [
  {
    id: "swaraj-kriya",
    title: "SwaRaj Kriya",
    durationLabel: "30 MIN",
    elapsedTimeLabel: "1:42",
    progressRatio: 0.29,
  },
  {
    id: "swaraj-kriya-extended",
    title: "SwaRaj Kriya",
    subtitle: "Extended",
    durationLabel: "45 MIN",
    elapsedTimeLabel: "1:42",
    progressRatio: 0.29,
  },
];

export function getPracticeSessionById(
  id: string | undefined,
): PracticeSessionMock {
  return (
    MOCK_PRACTICE_SESSIONS.find(session => session.id === id) ??
    MOCK_PRACTICE_SESSIONS[0]
  );
}

export type GuidedAudioMock = {
  id: string;
  title: string;
  titleWeight: "medium" | "semibold";
};

export const MOCK_GUIDED_AUDIOS: GuidedAudioMock[] = [
  {id: "rohaniyat", title: "Rohaniyat", titleWeight: "semibold"},
  {id: "sri-gurus-voice", title: "Sri Guru's Voice", titleWeight: "medium"},
];

export const MOCK_KRIYA_MOOD = {
  label: "Neutral",
  // 0 = Poor, 1 = Excellent.
  valueRatio: 0.5,
};

export const MOCK_KRIYA_FEELING_NOW = {
  label: "Neutral",
  // 0 = Not Feeling Good, 1 = Feeling Good.
  valueRatio: 0.5,
};

export type ImprovementOptionMock = {
  id: string;
  label: string;
};

export const MOCK_IMPROVEMENT_OPTIONS: ImprovementOptionMock[] = [
  {id: "low-on-energy", label: "Low on energy"},
  {id: "not-well", label: "Not well"},
  {id: "too-many-thoughts", label: "Too many thoughts"},
  {id: "less-focus", label: "Less focus"},
  {id: "got-asleep", label: "I got asleep"},
  {id: "lacking-motivation", label: "Lacking in motivation"},
];

// SwaRaj Kriya introduction (Free / Premium users) — Figma 1580:1214.
export const SWARAJ_KRIYA_INTRO_COPY = {
  eyebrow: "Start Your Journey with",
  title: "SwaRaj Kriya",
  body: "Here is an introduction to SwaRaj Kriya. It helps you understand the use and benefits of the Kriya in the short and long run. Once you are ready, send us a message to find out how you can start learning the Kriya.",
  continueLabel: "Continue Watching",
  applyLabel: "Apply for SwaRaj Kriya Course",
  sectionTitle: "Introduction to SwaRaj Kriya",
} as const;

export type IntroductionVideoMock = {
  id: string;
  title: string;
  durationLabel: string;
};

export const MOCK_INTRODUCTION_VIDEOS: IntroductionVideoMock[] = [
  {
    id: "do-you-need-kriya",
    title: "Do you need Kriya?",
    durationLabel: "30 Min",
  },
  {id: "lifes-final-goal", title: "Life’s Final Goal", durationLabel: "30 Min"},
];

// Application form (Figma 1580:1721). The country list is India-only until
// the backend supplies one, matching the +91-only phone field.
export const APPLICATION_COUNTRY = "India";

export const ATTENDED_EVENT_OPTIONS: {
  id: AttendedEventType;
  label: string;
}[] = [
  {id: "LIVE_EVENTS", label: "Live Events"},
  {id: "SCREENING_SATSANGS", label: "Screening Satsangs"},
  {id: "DHYAN_SANGHA", label: "Dhyan Sangha"},
  {id: "RETREAT", label: "Retreat"},
  {id: "NEVER_ATTENDED", label: "Never Attended"},
];
