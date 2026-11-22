import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/client";
import { colors, radius, sheetShadow, spacing, typography } from "../../constants/theme";
import useAuthStore from "../../store/authStore";

export default function Search() {
  const currentUser = useAuthStore((state) => state.user);

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followingIds, setFollowingIds] = useState<string[]>(
    currentUser?.following || [],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUsers();
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchUsers = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.get("/users/search", {
        params: {
          query: trimmedQuery,
        },
      });

      setUsers(response.data.users || []);
    } catch (error: any) {
      console.log(
        "Search error:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      await api.put(`/users/${userId}/follow`);

      setFollowingIds((currentIds) => [...currentIds, userId]);
      const user = useAuthStore.getState().user;
      if (user) useAuthStore.getState().setUser({ ...user, following: [...new Set([...user.following, userId])] });
    } catch (error: any) {
      Alert.alert(
        "Could not follow user",
        error.response?.data?.message || "Please try again.",
      );
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      await api.put(`/users/${userId}/unfollow`);

      setFollowingIds((currentIds) => currentIds.filter((id) => id !== userId));
      const user = useAuthStore.getState().user;
      if (user) useAuthStore.getState().setUser({ ...user, following: user.following.filter(id => id !== userId) });
    } catch (error: any) {
      Alert.alert(
        "Could not unfollow user",
        error.response?.data?.message || "Please try again.",
      );
    }
  };

  const renderUser = ({ item }: { item: any }) => {
    const isCurrentUser = item._id === currentUser?._id;
    const isFollowing = followingIds.includes(item._id);

    return (
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.username}>@{item.username}</Text>

          {item.bio ? <Text style={styles.bio}>{item.bio}</Text> : null}
        </View>

        {!isCurrentUser ? (
          <Pressable
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={() =>
              isFollowing ? handleUnfollow(item._id) : handleFollow(item._id)
            }
          >
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>

        <Text style={styles.subtitle}>
          Find people and join their conversations.
        </Text>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={21} color={colors.tonerMuted} style={styles.searchIcon} />

          <TextInput
            selectionColor={colors.accent}
            style={styles.searchInput}
            placeholder="Search name or username"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {isLoading ? (
            <ActivityIndicator size="small" color={colors.tonerMuted} />
          ) : null}
        </View>

        <FlatList
          data={users}
          keyExtractor={(user) => user._id}
          renderItem={renderUser}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            query.trim() && !isLoading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No users found</Text>
                <Text style={styles.emptyText}>
                  Try searching with a different name or username.
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Search for people</Text>
                <Text style={styles.emptyText}>
                  Type a name or username above.
                </Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  title: {
    fontFamily: typography.display,
    fontSize: 40,
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

  searchBox: {
    ...sheetShadow,
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.toner,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
  },

  searchIcon: {
    marginRight: spacing.sm,
    fontSize: 24,
    color: colors.tonerMuted,
  },

  searchInput: {
    flex: 1,
    paddingVertical: spacing.lg,
    fontSize: 16,
    fontFamily: typography.body,
    color: colors.toner,
  },

  listContent: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    paddingBottom: 100,
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.lg,
  },

  avatar: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.copy,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.toner,
  },

  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: typography.body,
    color: colors.text,
  },

  username: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: typography.body,
    color: colors.textMuted,
  },

  bio: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: typography.body,
    color: colors.textSecondary,
  },

  followButton: {
    ...sheetShadow,
    marginLeft: spacing.sm,
    borderRadius: radius.md,
    minHeight: 40,
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  followingButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.copy,
  },

  followButtonText: {
    fontFamily: typography.body,
    fontSize: 13,
    fontWeight: "700",
    color: colors.primaryText,
  },

  followingButtonText: {
    color: colors.toner,
  },

  emptyContainer: {
    ...sheetShadow,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.copy,
    marginBottom: 140,
    padding: spacing.xl,
  },

  emptyTitle: {
    fontFamily: typography.display,
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.toner,
  },

  emptyText: {
    marginTop: spacing.sm,
    textAlign: "center",
    fontSize: 14,
    fontFamily: typography.body,
    color: colors.tonerMuted,
  },
});
