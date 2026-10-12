// Mock data standing in for the Kriya feature's backend/query layer.

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
