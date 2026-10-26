import {type Href, router} from "expo-router";

import type {ExploreCategoryId} from "./mockData";

// Routes for the category chips shared by Explore, Videos, Bhakti and
// Events. "blogs" has no screen yet — selecting it stays a no-op, same as
// it already was on the Explore screen.
const CATEGORY_ROUTES: Partial<Record<ExploreCategoryId, Href>> = {
  all: "/explore",
  videos: "/videos",
  bhakti: "/bhakti",
  events: "/events",
};

export function navigateToExploreCategory(
  currentCategory: ExploreCategoryId,
  nextCategory: ExploreCategoryId,
) {
  if (nextCategory === currentCategory) {
    return;
  }
  const path = CATEGORY_ROUTES[nextCategory];
  if (!path) {
    return;
  }
  if (currentCategory === "all") {
    router.push(path);
  } else {
    router.replace(path);
  }
}
