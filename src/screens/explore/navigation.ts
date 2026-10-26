import {type Href, router} from "expo-router";

import type {ExploreCategoryId} from "./mockData";

// Routes for the category chips shared by Explore, Videos, Bhakti, Events
// and Blog.
const CATEGORY_ROUTES: Partial<Record<ExploreCategoryId, Href>> = {
  all: "/explore",
  videos: "/videos",
  bhakti: "/bhakti",
  events: "/events",
  blogs: "/blog",
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
