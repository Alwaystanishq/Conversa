import { useState } from "react";
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
import api from "../../api/client";
import { colors, radius, spacing } from "../../constants/theme";

export default function Create() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      Alert.alert("Post is empty", "Write something before posting.");
      return;
    }

    try {
      setIsLoading(true);
      await api.post("/post", {
        content: trimmedContent,
      });
      setContent("");
      router.replace("/Home");
    } catch (error: any) {
      Alert.alert(
        "Could not create post",
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
            <Text style={styles.title}>Create post</Text>
            <Text style={styles.subtitle}>
              Share what is on your mind with Conversa.
            </Text>
            <View style={styles.editor}>
              <TextInput
                style={styles.input}
                placeholder="Write something..."
                placeholderTextColor={colors.textMuted}
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                maxLength={280}
              />
              <Text style={styles.characterCount}>{content.length}/280</Text>
            </View>
          </View>
          <Pressable
            style={[
              styles.postButton,
              (isLoading || !content.trim()) && styles.postButtonDisabled,
            ]}
            onPress={handleCreatePost}
            disabled={isLoading || !content.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.primaryText} />
            ) : (
              <Text style={styles.postButtonText}>Post</Text>
            )}
          </Pressable>
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

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
  },

  editor: {
    minHeight: 220,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },

  input: {
    flex: 1,
    minHeight: 160,
    fontSize: 17,
    lineHeight: 24,
    color: colors.text,
  },

  characterCount: {
    marginTop: spacing.md,
    alignSelf: "flex-end",
    fontSize: 13,
    color: colors.textMuted,
  },

  postButton: {
    alignItems: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
  },

  postButtonDisabled: {
    opacity: 0.45,
  },

  postButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },
});
