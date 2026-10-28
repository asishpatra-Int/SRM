import {StyleSheet} from "react-native";

import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {useAuthStore} from "@/store";

export default function RootLayout() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  // Auth guard: while signed out, "/" (the home tabs) is unavailable, so
  // launch falls through to the (auth) stack — splash → onboarding → login →
  // OTP. Signing in flips both guards: the auth stack (and its history) is
  // dropped and the router lands on the existing home tabs, so the splash
  // can't be replayed via back.
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Protected guard={isLoggedIn}>
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
