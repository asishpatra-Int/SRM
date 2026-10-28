import {Stack} from "expo-router";

export const unstable_settings = {
  initialRouteName: "splash",
};

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="splash" options={{animation: "none"}} />
      <Stack.Screen
        name="onboarding"
        options={{animation: "fade", gestureEnabled: false}}
      />
      <Stack.Screen name="login" />
      <Stack.Screen name="otp-verification" />
    </Stack>
  );
}
