// Mock data standing in for the Kriya landing feed until the backend/query layer exists.

export type PracticeSessionMock = {
  id: string;
  title: string;
  subtitle?: string;
  durationLabel: string;
};

export const MOCK_TIMES_COMPLETED_TODAY = 1;

export const MOCK_PRACTICE_SESSIONS: PracticeSessionMock[] = [
  {id: "swaraj-kriya", title: "SwaRaj Kriya", durationLabel: "30 MIN"},
  {
    id: "swaraj-kriya-extended",
    title: "SwaRaj Kriya",
    subtitle: "Extended",
    durationLabel: "45 MIN",
  },
];

export type GuidedAudioMock = {
  id: string;
  title: string;
  titleWeight: "medium" | "semibold";
};

export const MOCK_GUIDED_AUDIOS: GuidedAudioMock[] = [
  {id: "rohaniyat", title: "Rohaniyat", titleWeight: "semibold"},
  {id: "sri-gurus-voice", title: "Sri Guru's Voice", titleWeight: "medium"},
];
