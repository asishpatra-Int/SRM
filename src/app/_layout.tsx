import {useEffect, useRef} from "react";

import {StyleSheet} from "react-native";

import {router, Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {useAuthStore} from "@/store";

export default function RootLayout() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  const isGuest = useAuthStore(s => s.isGuest);

  // Guest mode keeps the auth stack reachable (Sign Up opens login), so no
  // guard flips away from onboarding — move the guest to Explore explicitly.
  // This runs here, after the Stack has committed the opened (tabs) guard;
  // navigating from the onboarding press handler would still see it closed.
  useEffect(() => {
    if (isGuest) {
      router.replace("/explore");
    }
  }, [isGuest]);

  // Logging out (Profile's Log Out) opens the (auth) stack at its initial
  // route, the splash — skip the splash/onboarding replay and land on login.
  // Same timing as above: wait for the Stack to commit the flipped guard.
  const wasLoggedInRef = useRef(isLoggedIn);
  useEffect(() => {
    if (wasLoggedInRef.current && !isLoggedIn) {
      router.replace("/login");
    }
    wasLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  // Auth guard: while signed out (and not a guest), "/" (the home tabs) is
  // unavailable, so launch falls through to the (auth) stack — splash →
  // onboarding → login → OTP. Signing in flips both guards: the auth stack
  // (and its history) is dropped and the router lands on the existing home
  // tabs, so the splash can't be replayed via back.
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Protected guard={isLoggedIn || isGuest}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" options={{animation: "fade"}} />
          </Stack.Protected>
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
