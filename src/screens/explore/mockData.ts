// Mock data standing in for the Explore feature's backend/query layer.

import exploreBhaktiArtwork1 from "@/assets/explore-bhakti-artwork-1.png";
import exploreBhaktiArtwork2 from "@/assets/explore-bhakti-artwork-2.png";
import exploreBhaktiArtwork3 from "@/assets/explore-bhakti-artwork-3.png";
import exploreBhaktiArtwork4 from "@/assets/explore-bhakti-artwork-4.png";
import exploreBlogAumBg from "@/assets/explore-blog-aum-bg.png";
import exploreBlogGarbaThumb from "@/assets/explore-blog-garba-thumb.png";
import exploreBlogWhispersThumb from "@/assets/explore-blog-whispers-thumb.png";
import exploreEventGitaWisdom1 from "@/assets/explore-event-gita-wisdom-1.png";
import exploreEventGitaWisdom2 from "@/assets/explore-event-gita-wisdom-2.png";
import exploreEventGitaWisdom3 from "@/assets/explore-event-gita-wisdom-3.png";
import exploreEventGitaWisdom4 from "@/assets/explore-event-gita-wisdom-4.png";
import exploreEventGitaWisdom5 from "@/assets/explore-event-gita-wisdom-5.png";
import exploreEventHero from "@/assets/explore-event-hero.png";
import exploreFeaturedBanner from "@/assets/explore-featured-banner.png";
import exploreGuruVoiceArtwork from "@/assets/explore-guru-voice-artwork.png";
import exploreRohaniyatArtwork from "@/assets/explore-rohaniyat-artwork.png";
import exploreVideoGuruThumb from "@/assets/explore-video-guru-thumb.png";
import exploreVideoRohaniyatThumb from "@/assets/explore-video-rohaniyat-thumb.png";
import exploreVideoThumb3 from "@/assets/explore-video-thumb-3.png";
import exploreVideoThumb4 from "@/assets/explore-video-thumb-4.png";
import exploreVideoThumb5 from "@/assets/explore-video-thumb-5.png";

export type ExploreCategoryId =
  | "all"
  | "videos"
  | "bhakti"
  | "events"
  | "blogs";

// The Event Details screen's hero banner — one mock photo shared by every
// event, exactly as Figma has it.
export const EVENT_DETAILS_HERO_IMAGE = exploreEventHero;

export type FeaturedItemMock = {
  id: string;
  image: number;
};

export const MOCK_FEATURED_ITEMS: FeaturedItemMock[] = [
  {id: "bhagavad-gita-talk", image: exploreFeaturedBanner},
  {id: "bhagavad-gita-talk-2", image: exploreFeaturedBanner},
  {id: "bhagavad-gita-talk-3", image: exploreFeaturedBanner},
];

export type BhaktiAlbumTrackMock = {
  id: string;
  title: string;
};

const MOCK_ALBUM_TRACKS: BhaktiAlbumTrackMock[] = [
  {id: "sab-ka-mangal", title: "Sab Ka Mangal"},
  {id: "a-prayer-for-all", title: "A Prayer for All"},
  {id: "in-gratitude", title: "In Gratitude"},
  {id: "the-light-within", title: "The Light Within"},
  {id: "a-moment-of-stillness", title: "A Moment of Stillness"},
  {id: "peace-in-every-heart", title: "Peace in Every Heart"},
];

export type BhaktiTrackMock = {
  id: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  trackCountLabel: string;
  artwork: number;
  tracks: BhaktiAlbumTrackMock[];
};

export const MOCK_LATEST_BHAKTI: BhaktiTrackMock[] = [
  {
    id: "sab-ka-mangal-1",
    title: "Sab Ka Mangal",
    fullTitle: "Sab Ka Mangal (feat. Sri Guru)",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork1,
    tracks: MOCK_ALBUM_TRACKS,
  },
  {
    id: "sab-ka-mangal-2",
    title: "Sab Ka Mangal",
    fullTitle: "Sab Ka Mangal (feat. Sri Guru)",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork2,
    tracks: MOCK_ALBUM_TRACKS,
  },
  {
    id: "sab-ka-mangal-3",
    title: "Sab Ka Mangal",
    fullTitle: "Sab Ka Mangal (feat. Sri Guru)",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork3,
    tracks: MOCK_ALBUM_TRACKS,
  },
  {
    id: "sab-ka-mangal-4",
    title: "Sab Ka Mangal",
    fullTitle: "Sab Ka Mangal (feat. Sri Guru)",
    subtitle: "Voices of SRM",
    trackCountLabel: "6 Bhakti",
    artwork: exploreBhaktiArtwork4,
    tracks: MOCK_ALBUM_TRACKS,
  },
];

export function getBhaktiAlbumById(id: string | undefined): BhaktiTrackMock {
  return (
    MOCK_LATEST_BHAKTI.find(album => album.id === id) ?? MOCK_LATEST_BHAKTI[0]
  );
}

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
  fullLocation?: string;
  description?: string;
};

const MOCK_EVENT_DESCRIPTION =
  "Here is an introduction to SwaRaj Kriya. It helps you understand the use and benefits of the Kriya in the short and long run. Once you are ready, send us a message to find out how you can start learning the Kriya.";

export const MOCK_UPCOMING_EVENTS: UpcomingEventMock[] = [
  {
    id: "gita-wisdom-delhi",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 October, 7 PM",
    background: exploreEventGitaWisdom1,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
  {
    id: "gita-wisdom-december",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 December, 7 PM",
    background: exploreEventGitaWisdom2,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
  {
    id: "gita-wisdom-october-24",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "Oct 24, 7 AM",
    background: exploreEventGitaWisdom3,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
];

export type VideoListItemMock = {
  id: string;
  title: string;
  dateLabel: string;
  thumbnail: number;
};

export const MOCK_VIDEO_LIST: VideoListItemMock[] = [
  {
    id: "video-1",
    title: "Rohaniyat",
    dateLabel: "9 October 2026",
    thumbnail: exploreVideoRohaniyatThumb,
  },
  {
    id: "video-2",
    title: "Rohaniyat",
    dateLabel: "9 October 2026",
    thumbnail: exploreVideoGuruThumb,
  },
  {
    id: "video-3",
    title: "Rohaniyat",
    dateLabel: "9 October 2026",
    thumbnail: exploreVideoThumb3,
  },
  {
    id: "video-4",
    title: "Rohaniyat",
    dateLabel: "9 October 2026",
    thumbnail: exploreVideoThumb4,
  },
  {
    id: "video-5",
    title: "Rohaniyat",
    dateLabel: "9 October 2026",
    thumbnail: exploreVideoThumb5,
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

const MOCK_BLOG_BODY = [
  "The list of things that the ego dislikes runs miles long. Near the top of that list sits one act the ego finds almost unbearable: admitting someone else could be right (or could also be right). Admitting “you are right” is a powerful way to tame the ego.",
  "However, the urge to explain our perspective is natural and often necessary. There are two ways to do this:",
  "“You are right, but I think…”",
];

export type BlogPostDetailMock = BlogPostMock & {
  category: string;
  body: string[];
};

// The Blog Listing/Details screens' own full list — kept separate from the
// 3-item teaser row above so the Explore screen's existing preview is
// untouched.
export const MOCK_BLOG_LIST: BlogPostDetailMock[] = [
  {
    id: "the-other-garba",
    dateLabel: "12 October 2026",
    title: "The Other Garba",
    thumbnail: exploreBlogGarbaThumb,
    category: "Inspiring",
    body: MOCK_BLOG_BODY,
  },
  {
    id: "someday",
    dateLabel: "9 October 2026",
    title: "Someday",
    thumbnail: exploreBlogAumBg,
    hasLogoBadge: true,
    category: "Inspiring",
    body: MOCK_BLOG_BODY,
  },
  {
    id: "a-rose-without-thorns",
    dateLabel: "5 October 2026",
    title: "A Rose Without Thorns",
    thumbnail: exploreBlogAumBg,
    hasLogoBadge: true,
    category: "Inspiring",
    body: MOCK_BLOG_BODY,
  },
  {
    id: "whispers-in-the-wind",
    dateLabel: "30 September 2026",
    title: "Whispers in the Wind",
    thumbnail: exploreBlogWhispersThumb,
    category: "Inspiring",
    body: MOCK_BLOG_BODY,
  },
  {
    id: "beneath-the-silent-oak",
    dateLabel: "27 September 2026",
    title: "Beneath the Silent Oak",
    thumbnail: exploreBlogAumBg,
    hasLogoBadge: true,
    category: "Inspiring",
    body: MOCK_BLOG_BODY,
  },
  {
    id: "echoes-of-forgotten-dreams",
    dateLabel: "22 September 2026",
    title: "Echoes of Forgotten Dreams",
    thumbnail: exploreBlogAumBg,
    hasLogoBadge: true,
    category: "Inspiring",
    body: MOCK_BLOG_BODY,
  },
];

export function getBlogPostById(id: string | undefined): BlogPostDetailMock {
  return MOCK_BLOG_LIST.find(post => post.id === id) ?? MOCK_BLOG_LIST[0];
}

// The Events screen's own full lists — kept separate from the 3-item
// teaser row above so the Explore screen's existing preview is untouched.
export const MOCK_EVENTS_UPCOMING: UpcomingEventMock[] = [
  {
    id: "gita-wisdom-upcoming-1",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 October, 7 PM",
    background: exploreEventGitaWisdom1,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
  {
    id: "gita-wisdom-upcoming-2",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 December, 7 PM",
    background: exploreEventGitaWisdom2,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
  {
    id: "gita-wisdom-upcoming-3",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 October, 7 PM",
    background: exploreEventGitaWisdom4,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
  {
    id: "gita-wisdom-upcoming-4",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 December, 7 PM",
    background: exploreEventGitaWisdom5,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
];

export const MOCK_EVENTS_PAST: UpcomingEventMock[] = [
  {
    id: "gita-wisdom-past-1",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 October, 7 PM",
    background: exploreEventGitaWisdom1,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
  {
    id: "gita-wisdom-past-2",
    title: "Gita Wisdom",
    location: "Delhi",
    dateTimeLabel: "12 December, 7 PM",
    background: exploreEventGitaWisdom1,
    fullLocation: "Shah Auditorium, Delhi",
    description: MOCK_EVENT_DESCRIPTION,
  },
];

const ALL_EVENTS = [
  ...MOCK_UPCOMING_EVENTS,
  ...MOCK_EVENTS_UPCOMING,
  ...MOCK_EVENTS_PAST,
];

export function getEventById(id: string | undefined): UpcomingEventMock {
  return ALL_EVENTS.find(event => event.id === id) ?? ALL_EVENTS[0];
}
