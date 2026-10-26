// Mock data standing in for the Explore feature's backend/query layer.

import exploreBhaktiArtwork1 from "@/assets/explore-bhakti-artwork-1.png";
import exploreBhaktiArtwork2 from "@/assets/explore-bhakti-artwork-2.png";
import exploreBhaktiArtwork3 from "@/assets/explore-bhakti-artwork-3.png";
import exploreBhaktiArtwork4 from "@/assets/explore-bhakti-artwork-4.png";
import exploreBlogAumBg from "@/assets/explore-blog-aum-bg.png";
import exploreBlogGarbaThumb from "@/assets/explore-blog-garba-thumb.png";
import exploreEventGitaWisdom1 from "@/assets/explore-event-gita-wisdom-1.png";
import exploreEventGitaWisdom2 from "@/assets/explore-event-gita-wisdom-2.png";
import exploreEventGitaWisdom3 from "@/assets/explore-event-gita-wisdom-3.png";
import exploreFeaturedBanner from "@/assets/explore-featured-banner.png";
import exploreGuruVoiceArtwork from "@/assets/explore-guru-voice-artwork.png";
import exploreRohaniyatArtwork from "@/assets/explore-rohaniyat-artwork.png";
import exploreVideoGuruThumb from "@/assets/explore-video-guru-thumb.png";
import exploreVideoRohaniyatThumb from "@/assets/explore-video-rohaniyat-thumb.png";

export type ExploreCategoryId =
  | "all"
  | "videos"
  | "bhakti"
  | "events"
  | "blogs";

export type FeaturedItemMock = {
  id: string;
  image: number;
};

export const MOCK_FEATURED_ITEMS: FeaturedItemMock[] = [
  {id: "bhagavad-gita-talk", image: exploreFeaturedBanner},
  {id: "bhagavad-gita-talk-2", image: exploreFeaturedBanner},
  {id: "bhagavad-gita-talk-3", image: exploreFeaturedBanner},
];

export type BhaktiTrackMock = {
  id: string;
  title: string;
  subtitle: string;
  trackCountLabel: string;
  artwork: number;
};

export const MOCK_LATEST_BHAKTI: BhaktiTrackMock[] = [
  {
    id: "sab-ka-mangal-1",
    title: "Sab Ka Mangal",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork1,
  },
  {
    id: "sab-ka-mangal-2",
    title: "Sab Ka Mangal",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork2,
  },
  {
    id: "sab-ka-mangal-3",
    title: "Sab Ka Mangal",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork3,
  },
  {
    id: "sab-ka-mangal-4",
    title: "Sab Ka Mangal",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork4,
  },
];

export type RandomTrackMock = {
  id: string;
  title: string;
  artwork: number;
};

export const MOCK_RANDOM_PLAY: RandomTrackMock[] = [
  {id: "rohaniyat", title: "Rohaniyat", artwork: exploreRohaniyatArtwork},
  {
    id: "sri-gurus-voice",
    title: "Sri Guru's Voice",
    artwork: exploreGuruVoiceArtwork,
  },
];

export type UpcomingEventMock = {
  id: string;
  title: string;
  location: string;
  dateTimeLabel: string;
  background: number;
};

export const MOCK_UPCOMING_EVENTS: UpcomingEventMock[] = [
  {
    id: "gita-wisdom-delhi",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 October, 7 PM",
    background: exploreEventGitaWisdom1,
  },
  {
    id: "gita-wisdom-december",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 December, 7 PM",
    background: exploreEventGitaWisdom2,
  },
  {
    id: "gita-wisdom-october-24",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "Oct 24, 7 AM",
    background: exploreEventGitaWisdom3,
  },
];

export type VideoItemMock = {
  id: string;
  title: string;
  thumbnail: number;
};

export const MOCK_LATEST_VIDEOS: VideoItemMock[] = [
  {
    id: "rohaniyat-video",
    title: "Rohaniyat",
    thumbnail: exploreVideoRohaniyatThumb,
  },
  {
    id: "sri-gurus-voice-video",
    title: "Sri Guru's Voice",
    thumbnail: exploreVideoGuruThumb,
  },
  {
    id: "sacred-echoes-video",
    title: "Sacred Echoes",
    thumbnail: exploreVideoRohaniyatThumb,
  },
];

export type BlogPostMock = {
  id: string;
  dateLabel: string;
  title: string;
  thumbnail?: number;
  hasLogoBadge?: boolean;
};

export const MOCK_LATEST_BLOGS: BlogPostMock[] = [
  {
    id: "the-other-garba",
    dateLabel: "12 October 2026",
    title: "The Other Garba",
    thumbnail: exploreBlogGarbaThumb,
  },
  {
    id: "someday",
    dateLabel: "9 October 2026",
    title: "Someday",
    thumbnail: exploreBlogAumBg,
    hasLogoBadge: true,
  },
  {
    id: "a-rose-without-thorns",
    dateLabel: "5 October 2026",
    title: "A Rose Without Thorns",
    thumbnail: exploreBlogAumBg,
    hasLogoBadge: true,
  },
];
