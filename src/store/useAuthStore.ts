import {useSyncExternalStore} from "react";

import type {UserModel} from "@/models/auth";

// Mock session store — the backend isn't ready, so "logging in" only flips an
// in-memory flag (nothing is persisted; every cold start begins at the splash).
// Guest mode ("Start Exploring") opens the tabs without signing in; signing
// in always ends it. `user` is the signed-in account (mobile number + user
// type) from OTP verification; social sign-in has no account yet, so it
// stays null there and in guest mode.
// The selector-hook shape mirrors Zustand's so this can be swapped for a
// persisted Zustand store without touching callers.

type AuthState = {
  isLoggedIn: boolean;
  isGuest: boolean;
  user: UserModel | null;
  logIn: (user?: UserModel) => void;
  logOut: () => void;
  enterGuestMode: () => void;
};

const listeners = new Set<() => void>();

let state: AuthState = {
  isLoggedIn: false,
  isGuest: false,
  user: null,
  logIn: user =>
    setState({isLoggedIn: true, isGuest: false, user: user ?? null}),
  logOut: () => setState({isLoggedIn: false, isGuest: false, user: null}),
  enterGuestMode: () => setState({isGuest: true}),
};

function setState(partial: Partial<AuthState>) {
  state = {...state, ...partial};
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getState() {
  return state;
}

export function useAuthStore<T>(selector: (s: AuthState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(getState()));
}

useAuthStore.getState = getState;
