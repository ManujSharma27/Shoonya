import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="ai-setup" />
      <Stack.Screen name="selfie" />
      <Stack.Screen name="birth-details" />
      <Stack.Screen name="voice-sample" />
      <Stack.Screen name="medical-baseline" />
      <Stack.Screen name="program-selection" />
      <Stack.Screen name="privacy-controls" />
    </Stack>
  );
}
