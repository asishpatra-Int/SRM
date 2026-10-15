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
};

export const MOCK_YOUR_PRACTICE_TRACKS: PracticeTrackMock[] = [
  {
    id: "breathing-ceremony",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackCeremony,
    isDownloaded: false,
  },
  {
    id: "breathing-sunset",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackSunset,
    isDownloaded: false,
  },
  {
    id: "breathing-meditation",
    title: "Breathing Exercise",
    genre: "Devotional",
    durationLabel: "08:24",
    image: practiceTrackMeditation,
    isDownloaded: false,
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
