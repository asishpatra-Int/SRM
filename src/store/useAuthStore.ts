import {useSyncExternalStore} from "react";

// Mock session store — the backend isn't ready, so "logging in" only flips an
// in-memory flag (nothing is persisted; every cold start begins at the splash).
// The selector-hook shape mirrors Zustand's so this can be swapped for a
// persisted Zustand store without touching callers.

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

const listeners = new Set<() => void>();

let state: AuthState = {
  isLoggedIn: false,
  logIn: () => setState({isLoggedIn: true}),
  logOut: () => setState({isLoggedIn: false}),
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
