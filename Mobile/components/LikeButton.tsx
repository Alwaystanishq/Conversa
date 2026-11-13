import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../api/client";
import { colors } from "../constants/theme";
import useAuthStore from "../store/authStore";

type Props = {
  postId: string;
  likes?: string[];
  onChange: (likes: string[]) => void;
};

export default function LikeButton({ postId, likes = [], onChange }: Props) {
  const user = useAuthStore((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const liked = Boolean(user && likes.includes(user._id));
  const color = liked ? colors.accent : colors.textSecondary;

  async function toggleLike() {
    if (!user || isUpdating) return;
    setIsUpdating(true);
    setError("");
    try {
      await api.post(`/posts/${postId}/${liked ? "unlike" : "like"}`);
      onChange(liked ? likes.filter((id) => id !== user._id) : [...likes, user._id]);
    } catch {
      setError("Couldn't update your like. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <View>
      <Pressable
        onPress={toggleLike}
        disabled={isUpdating || !user}
        accessibilityRole="button"
        accessibilityLabel={`${liked ? "Unlike" : "Like"} post, ${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
        accessibilityState={{ selected: liked, disabled: isUpdating || !user, busy: isUpdating }}
        style={({ pressed }) => [styles.button, (pressed || isUpdating) && styles.pressed]}
      >
        <Ionicons name={liked ? "heart" : "heart-outline"} size={21} color={color} />
        <Text style={[styles.count, { color }]}>{likes.length}</Text>
      </Pressable>
      {error ? <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, minWidth: 44, minHeight: 44, paddingHorizontal: 10, marginLeft: -10 },
  count: { fontSize: 13 },
  pressed: { opacity: 0.5 },
  error: { color: colors.error, fontSize: 13, lineHeight: 20, marginTop: 4 },
});
