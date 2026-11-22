import { useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors, radius, sheetShadow, spacing, typography } from "../constants/theme";
import api from "../api/client";
import useAuthStore from "../store/authStore";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = async () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post("/auth/register", {
        name: name.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
      });

      await setAuth(response.data.token, response.data.user);

      router.replace("/Home");
    } catch (error: any) {
      Alert.alert(
        "Registration failed",
        error.response?.data?.message || "Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View>
            <View style={styles.brandRow}>
              <Text style={styles.brand}>conversa<Text style={styles.brandDot}>.</Text></Text>
            </View>

            <Text style={styles.title}>Create account</Text>

            <Text style={styles.subtitle}>
              Join the conversation and share what is on your mind.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                selectionColor={colors.accent}
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!isLoading}
              />

              <Text style={[styles.label, styles.nextLabel]}>Username</Text>
              <TextInput
                selectionColor={colors.accent}
                style={styles.input}
                placeholder="username"
                placeholderTextColor={colors.textMuted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />

              <Text style={[styles.label, styles.nextLabel]}>
                Email address
              </Text>
              <TextInput
                selectionColor={colors.accent}
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />

              <Text style={[styles.label, styles.nextLabel]}>Password</Text>

              <View style={styles.passwordBox}>
                <TextInput
                selectionColor={colors.accent}
                  style={styles.passwordInput}
                  placeholder="Create a password"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!isLoading}
                />

                <Pressable
                  style={styles.showButton}
                  onPress={() => setShowPassword((value) => !value)}
                  disabled={isLoading}
                >
                  <Text style={styles.showText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                style={[
                  styles.primaryButton,
                  (isLoading ||
                    !name.trim() ||
                    !username.trim() ||
                    !email.trim() ||
                    !password.trim()) &&
                    styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={
                  isLoading ||
                  !name.trim() ||
                  !username.trim() ||
                  !email.trim() ||
                  !password.trim()
                }
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.primaryText} />
                ) : (
                  <Text style={styles.primaryButtonText}>Create account</Text>
                )}
              </Pressable>
              <GoogleSignInButton disabled={isLoading} />
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account? </Text>

            <Pressable onPress={() => router.back()} disabled={isLoading}>
              <Text style={styles.bottomLink}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  brand: {
    fontFamily: typography.display,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.text,
  },

  brandDot: {
    color: colors.accent,
  },

  title: {
    fontFamily: typography.display,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
  },

  form: {
    ...sheetShadow,
    marginTop: spacing.lg,
    backgroundColor: colors.copy,
    padding: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: typography.body,
    color: colors.toner,
  },

  nextLabel: {
    marginTop: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.tonerMuted,
    borderRadius: radius.md,
    backgroundColor: colors.copyMuted,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: typography.body,
    color: colors.toner,
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.tonerMuted,
    borderRadius: radius.md,
    backgroundColor: colors.copyMuted,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: typography.body,
    color: colors.toner,
  },

  showButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },

  showText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: typography.body,
    color: colors.toner,
  },

  primaryButton: {
    ...sheetShadow,
    marginTop: spacing.xl,
    alignItems: "center",
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    minHeight: 48,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  primaryButtonText: {
    fontFamily: typography.body,
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomText: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.textMuted,
  },

  bottomLink: {
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: "700",
    color: colors.accent,
  },
});
