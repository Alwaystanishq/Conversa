import { useState } from "react";
import {
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
import { colors, radius, spacing } from "../constants/theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View>
            <View style={styles.brandRow}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>C</Text>
              </View>

              <Text style={styles.brand}>Conversa</Text>
            </View>

            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.subtitle}>
              Log in to share thoughts and join the conversation.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email address</Text>

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={styles.passwordLabelRow}>
                <Text style={styles.label}>Password</Text>

                <Pressable>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>

              <View style={styles.passwordBox}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />

                <Pressable
                  style={styles.showButton}
                  onPress={() => setShowPassword((value) => !value)}
                >
                  <Text style={styles.showText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>

              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Log in</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>New to Conversa? </Text>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.bottomLink}>Create an account</Text>
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 23,
    fontWeight: "900",
    color: colors.primaryText,
  },

  brand: {
    marginLeft: spacing.md,
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },

  form: {
    marginTop: 40,
  },

  label: {
    marginBottom: spacing.sm,
    fontSize: 14,
    fontWeight: "600",
    color: "#d4d4d8",
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },

  passwordLabelRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },

  showButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },

  showText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d4d4d8",
  },

  primaryButton: {
    marginTop: 28,
    alignItems: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomText: {
    fontSize: 14,
    color: colors.textMuted,
  },

  bottomLink: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
});
