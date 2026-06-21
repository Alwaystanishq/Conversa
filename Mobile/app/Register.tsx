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

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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

            <Text style={styles.title}>Create account</Text>

            <Text style={styles.subtitle}>
              Join the conversation and share what is on your mind.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={[styles.label, styles.nextLabel]}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="username"
                placeholderTextColor={colors.textMuted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={[styles.label, styles.nextLabel]}>
                Email address
              </Text>
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

              <Text style={[styles.label, styles.nextLabel]}>Password</Text>
              <View style={styles.passwordBox}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Create a password"
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
                <Text style={styles.primaryButtonText}>Create account</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account? </Text>

            <Pressable onPress={() => router.back()}>
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
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
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
  },

  form: {
    marginTop: 28,
  },

  label: {
    marginBottom: spacing.sm,
    fontSize: 14,
    fontWeight: "600",
    color: "#d4d4d8",
  },

  nextLabel: {
    marginTop: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
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
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },

  showButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },

  showText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d4d4d8",
  },

  primaryButton: {
    marginTop: spacing.xl,
    alignItems: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    paddingVertical: 15,
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
