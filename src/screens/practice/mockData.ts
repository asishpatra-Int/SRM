// Mock data standing in for the Practice feature's backend/query layer.

import practiceTrackCeremony from "@/assets/practice-track-ceremony.png";
import practiceTrackForestPath from "@/assets/practice-track-forest-path.png";
import practiceTrackMeditation from "@/assets/practice-track-meditation.png";
import practiceTrackSunset from "@/assets/practice-track-sunset.png";

export type PracticeTrackMock = {
  id: string;
  title: string;
  genre: string;
  durationLabel: string;
  image: number;
  isDownloaded: boolean;
  isBookmarked: boolean;
  // Content details page only, below.
  pillDurationLabel: string;
  description: {id: string; text: string}[];
};

const MOCK_TRACK_DESCRIPTION = [
  {
    id: "intro",
    text: "Here is an introduction to SwaRaj Kriya. It helps you understand the use and benefits of the Kriya in the short and long run. Once you are ready, send us a message to find out how you can start learning the Kriya.",
  },
  {
    id: "next-steps",
    text: "Here is an introduction to SwaRaj Kriya. It helps you understand the use and benefits of the Kriya in the short and long run. Once you are ready, send us a message to find out how you can start learning the Kriya.",
  },
];

export const MOCK_YOUR_PRACTICE_TRACKS: PracticeTrackMock[] = [
  {
    id: "breathing-ceremony",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackCeremony,
    isDownloaded: false,
    isBookmarked: true,
    pillDurationLabel: "30 Min",
    description: MOCK_TRACK_DESCRIPTION,
  },
  {
    id: "breathing-sunset",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackSunset,
    isDownloaded: false,
    isBookmarked: true,
    pillDurationLabel: "30 Min",
    description: MOCK_TRACK_DESCRIPTION,
  },
  {
    id: "breathing-meditation",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackMeditation,
    isDownloaded: false,
    isBookmarked: false,
    pillDurationLabel: "30 Min",
    description: MOCK_TRACK_DESCRIPTION,
  },
];

export const MOCK_OTHER_TRACKS: PracticeTrackMock[] = [
  {
    id: "breathing-forest-path",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackForestPath,
    isDownloaded: true,
    isBookmarked: true,
    pillDurationLabel: "30 Min",
    description: MOCK_TRACK_DESCRIPTION,
  },
];

const ALL_PRACTICE_TRACKS = [
  ...MOCK_YOUR_PRACTICE_TRACKS,
  ...MOCK_OTHER_TRACKS,
];

export function getPracticeTrackById(
  id: string | undefined,
): PracticeTrackMock {
  return (
    ALL_PRACTICE_TRACKS.find(track => track.id === id) ?? ALL_PRACTICE_TRACKS[0]
  );
}

export function getBookmarkedTracks(): PracticeTrackMock[] {
  return ALL_PRACTICE_TRACKS.filter(track => track.isBookmarked);
}

export function getDownloadedTracks(): PracticeTrackMock[] {
  return ALL_PRACTICE_TRACKS.filter(track => track.isDownloaded);
}

export type ListeningRitualStepMock = {
  id: string;
  icon: "leaf" | "music" | "sparkles";
  text: string;
};

export const MOCK_LISTENING_RITUAL: ListeningRitualStepMock[] = [
  {
    id: "quiet-space",
    icon: "leaf",
    text: "Find a quiet space and soften your gaze",
  },
  {id: "music", icon: "music", text: "Let your attention rest on the music"},
  {
    id: "stillness",
    icon: "sparkles",
    text: "Stay with the stillness for a few breaths",
  },
];

export type PracticeTopicMock = {
  id: string;
  label: string;
};

export const MOCK_PRACTICE_TOPICS: PracticeTopicMock[] = [
  {id: "breath", label: "Breath"},
  {id: "echo", label: "Echo"},
  {id: "whisper", label: "Whisper"},
  {id: "wisdom", label: "Wisdom"},
  {id: "meditation", label: "Meditation"},
  {id: "energisation", label: "Energisation"},
  {id: "devotional", label: "Devotional"},
];
