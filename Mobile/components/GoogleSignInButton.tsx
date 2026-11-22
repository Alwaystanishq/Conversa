import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text } from "react-native";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { authClient } from "../api/auth-client";
import useAuthStore from "../store/authStore";
import api from "../api/client";
import { colors, radius, spacing, typography } from "../constants/theme";

export default function GoogleSignInButton({ disabled }: { disabled: boolean }) {
  const [pending, setPending] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  async function signIn() {
    setPending(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google", callbackURL: "/Login", errorCallbackURL: "/Login?error=google",
      });
      if (error) throw new Error(error.message || "Google sign-in failed.");
      // A dismissed browser returns without a session.
      const { data, error: sessionError } = await authClient.getSession();
      if (sessionError) throw new Error(sessionError.message || "Unable to check your session.");
      if (!data) return;
      const response = await api.post("/auth/google", {}, {
        headers: { Cookie: await authClient.getCookie(), "expo-origin": "mobile://" },
      });
      await setAuth(response.data.token, response.data.user);
      void authClient.signOut().catch(() => {});
      router.replace("/Home");
    } catch (error) {
      Alert.alert("Google sign-in failed", (isAxiosError(error) && error.response?.data?.message) || (error instanceof Error ? error.message : "Please try again."));
    } finally {
      setPending(false);
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || pending}
      onPress={signIn}
      style={{ marginTop: spacing.md, padding: spacing.lg, borderWidth: 1, borderColor: colors.toner, borderRadius: radius.md, backgroundColor: colors.copyMuted, alignItems: "center", opacity: disabled || pending ? 0.5 : 1 }}
    >
      {pending ? <ActivityIndicator color={colors.toner} /> : <Text style={{ color: colors.toner, fontFamily: typography.body, fontWeight: "600" }}>Continue with Google</Text>}
    </Pressable>
  );
}
