import { useEffect, useState } from "react";
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
import { colors, radius, spacing } from "../../constants/theme";
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

      const response = await api.get("/user/search", {
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
      await api.put(`/user/${userId}/follow`);

      setFollowingIds((currentIds) => [...currentIds, userId]);
    } catch (error: any) {
      Alert.alert(
        "Could not follow user",
        error.response?.data?.message || "Please try again.",
      );
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      await api.put(`/user/${userId}/unfollow`);

      setFollowingIds((currentIds) => currentIds.filter((id) => id !== userId));
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
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search name or username"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {isLoading ? (
            <ActivityIndicator size="small" color={colors.textSecondary} />
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },

  searchIcon: {
    marginRight: spacing.sm,
    fontSize: 24,
    color: colors.textMuted,
  },

  searchInput: {
    flex: 1,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },

  listContent: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    paddingBottom: 100,
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },

  avatar: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: colors.border,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },

  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  username: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
  },

  bio: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
  },

  followButton: {
    marginLeft: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  followingButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  followButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primaryText,
  },

  followingButtonText: {
    color: colors.text,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 140,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },

  emptyText: {
    marginTop: spacing.sm,
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
  },
});
